package pages;

import org.testng.annotations.Test;
import com.relevantcodes.extentreports.ExtentReports;
import com.relevantcodes.extentreports.ExtentTest;
import com.relevantcodes.extentreports.LogStatus;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import static org.testng.Assert.assertTrue;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterClass;


public class Home_FormLogin {
	WebDriver driver;
	ExtentReports report;
	ExtentTest logger;

	@Parameters({ "nodeURL", "url", "username", "password" })
	@BeforeClass
	public void formLogin(String nodeURL, String url, String username, String password) throws InterruptedException, MalformedURLException {
		report = new ExtentReports("C:\\Users\\caciuser\\LocalDev\\caci\\challengeDEV\\challenge\\selenium\\trunk\\SeleniumTestNG\\caciChallenge\\log\\pages.Home_FormLogin.html");
		logger = report.startTest("Verify Home Page after Form Login");
		// driver, nodeURL
		DesiredCapabilities caps = DesiredCapabilities.chrome();
		caps.setBrowserName("chrome");
		caps.setPlatform(Platform.ANY);
		driver = new RemoteWebDriver(new URL(nodeURL), caps);
		logger.log(LogStatus.INFO, "Starting RemoteWebDriver connection");

		// maximize browser
		driver.manage().window().maximize();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		logger.log(LogStatus.INFO, "Maximizing browser window");

		// baseURL
		String baseURL = url;
		driver.get(baseURL);
		logger.log(LogStatus.INFO, "Navigating to: "+baseURL);

		// grab parent window handle
		String parentWindow = driver.getWindowHandle();
		logger.log(LogStatus.INFO, "Grabbing parentWindow handle: "+parentWindow);
		Thread.sleep(2000);

		// click 'Login' tab
		driver.findElement(By.cssSelector("a[name='login']")).click();
		logger.log(LogStatus.INFO, "Clicking 'Login' tab");
		Thread.sleep(1000);

		// enter email address and password
		driver.findElement(By.cssSelector("input[id='email']")).sendKeys(username);
		Thread.sleep(1000);
		driver.findElement(By.cssSelector("input[id='password']")).sendKeys(password);
		Thread.sleep(1000);
		driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();
		logger.log(LogStatus.INFO, "Providing login credentials");
		Thread.sleep(2000);

		// ASSERTION: verify user successfully logged in
		String actualString = driver.findElement(By.xpath("//div[contains(text(),'Local user account home')]")).getText();
		String expectedString = "Local user account home";
		assertTrue(actualString.contains(expectedString));	
		logger.log(LogStatus.PASS, "ASSERTION: verifying user successfully logged in");
		Thread.sleep(1000);
	}
	
	@Test
	public void navigateToHomePage() throws InterruptedException {
		// click 'Home' tab
		driver.findElement(By.cssSelector("a[name='home']")).click();
		logger.log(LogStatus.INFO, "Clicking 'Home' tab");
		Thread.sleep(1000);

		// ASSERTION: verify user is on 'Home' page
		String actualString = driver.findElement(By.xpath("//div//h3")).getText();
		String expectedString = "Welcome!";
		assertTrue(actualString.contains(expectedString));	
		logger.log(LogStatus.PASS, "ASSERTION: verifying user is on 'Home' page");
		Thread.sleep(1000);
	}

	@AfterClass
	public void formLogout() throws InterruptedException {
		// click 'Login' tab
		driver.findElement(By.cssSelector("a[name='login']")).click();
		logger.log(LogStatus.INFO, "Clicking 'Login' tab");
		Thread.sleep(1000);
		
		// click 'Logout' button
		driver.findElement(By.xpath("//button[contains(text(),'Logout')]")).click();
		logger.log(LogStatus.INFO, "Clicking on 'Logout' button");
		Thread.sleep(2000);

		// ASSERTION: verify user successfully logged in
		String actualString1 = driver.findElement(By.xpath("//h2[contains(text(),'Login')]")).getText();
		String expectedString1 = "Login";
		assertTrue(actualString1.contains(expectedString1));	
		logger.log(LogStatus.PASS, "ASSERTION: verifying user successfully logged out");
		Thread.sleep(1000);
				
		// close browser and driver
		driver.close();
		driver.quit();
		logger.log(LogStatus.INFO, "Closing browser and driver");
		report.endTest(logger);
		report.flush();
	}
}

