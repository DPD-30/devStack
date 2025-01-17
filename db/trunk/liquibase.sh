#!/usr/bin/env sh

LIQUIBASE_HOME=`cd "liquibase" && pwd`
if [ ! -n "${LIQUIBASE_HOME+x}" ]; then
  # echo "LIQUIBASE_HOME is not set."

  ## resolve links - $0 may be a symlink
  PRG="$0"
  while [ -h "$PRG" ] ; do
    ls=`ls -ld "$PRG"`
    link=`expr "$ls" : '.*-> \(.*\)$'`
    if expr "$link" : '/.*' > /dev/null; then
    PRG="$link"
    else
    PRG=`dirname "$PRG"`"/$link"
    fi
  done


  LIQUIBASE_HOME=`dirname "$PRG"`

  # make it fully qualified
  LIQUIBASE_HOME=`cd "$LIQUIBASE_HOME" && pwd`
  # echo "Liquibase Home: $LIQUIBASE_HOME"
fi

 
# build classpath from all jars in lib
if [ -f /usr/bin/cygpath ]; then
  CP=.
  for i in "$LIQUIBASE_HOME"/liquibase*.jar; do
    i=`cygpath --windows "$i"`
    CP="$CP;$i"
  done
  for i in "$LIQUIBASE_HOME"/lib/*.jar; do
    i=`cygpath --windows "$i"`
    CP="$CP;$i"
  done
else
  if [[ $(uname) = MINGW* ]]; then
    CP_SEPARATOR=";"
  else
    CP_SEPARATOR=":"
  fi
  CP=.
  for i in "$LIQUIBASE_HOME"/liquibase*.jar; do
    CP="$CP""$CP_SEPARATOR""$i"
  done
  CP="$CP""$CP_SEPARATOR""$LIQUIBASE_HOME/lib/"
  for i in "$LIQUIBASE_HOME"/lib/*.jar; do
    CP="$CP""$CP_SEPARATOR""$i"
  done
fi

if [ -z "${JAVA_HOME}" ]; then
  #JAVA_HOME not set, try to find a bundled version
  if [ -d "${LIQUIBASE_HOME}/jre" ]; then
    JAVA_HOME="$LIQUIBASE_HOME/jre"
  elif [ -d "${LIQUIBASE_HOME}/.install4j/jre.bundle/Contents/Home" ]; then
    JAVA_HOME="${LIQUIBASE_HOME}/.install4j/jre.bundle/Contents/Home"
  fi
fi

if [ -z "${JAVA_HOME}" ]; then
  JAVA_PATH="$(which java)"

  if [ -z "${JAVA_PATH}" ]; then
    echo "Cannot find java in your path. Install java or use the JAVA_HOME environment variable"
  fi
else
    #Use path in JAVA_HOME
    JAVA_PATH="${JAVA_HOME}/bin/java"
fi

# add any JVM options here
JAVA_OPTS="${JAVA_OPTS-}"

${JAVA_PATH} -cp "$CP" $JAVA_OPTS liquibase.integration.commandline.Main ${1+"$@"}
