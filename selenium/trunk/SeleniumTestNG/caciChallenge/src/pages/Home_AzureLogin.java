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
import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;


public class Home_AzureLogin {
	WebDriver driver;
	ExtentReports report;
	ExtentTest logger;

	@Parameters({ "nodeURL", "url", "username", "password" })
	@BeforeClass
	public void azureLogin(String nodeURL, String url, String username, String password) throws InterruptedException, MalformedURLException {
		report = new ExtentReports("C:\\Users\\caciuser\\LocalDev\\caci\\challengeDEV\\challenge\\selenium\\trunk\\SeleniumTestNG\\caciChallenge\\log\\pages.Home_AzureLogin.html");
		logger = report.startTest("Verify Home Page after Azure Login");
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
		Thread.sleep(1000);

		// click 'Admin' tab
		driver.findElement(By.cssSelector("a[name='admin']")).click();
		logger.log(LogStatus.INFO, "Clicking 'Admin' tab");
		Thread.sleep(1000);
		
		// Admin Login
		// click 'Admin Login' button
		driver.findElement(By.xpath("//button[contains(text(),'Admin Login')]")).click();
		logger.log(LogStatus.INFO, "Clicking 'Admin Login' button");
		Thread.sleep(1000);
		
		// switch to new window
		Set<String> allWindows = driver.getWindowHandles();
		logger.log(LogStatus.INFO, "Window handles: "+allWindows);
		Iterator<String> i = allWindows.iterator();
		while(i.hasNext()){
			String childWindow = i.next();
			if(!childWindow.equalsIgnoreCase(parentWindow)){
				driver.switchTo().window(childWindow);
				logger.log(LogStatus.INFO, "The childWindow is: "+childWindow);
				logger.log(LogStatus.INFO, "Grabbing all window handles and switching to childWindow: "+childWindow);
			}
		}
		Thread.sleep(1000);

		// provide credentials
		driver.findElement(By.cssSelector("input[name='loginfmt']")).sendKeys(username);
		Thread.sleep(1000);
		driver.findElement(By.cssSelector("input[id='idSIButton9']")).click();
		Thread.sleep(1000);
		driver.findElement(By.cssSelector("input[name='passwd']")).sendKeys(password);
		Thread.sleep(1000);
		driver.findElement(By.cssSelector("input[value='Sign in']")).click();
		logger.log(LogStatus.INFO, "Providing login credentials");
		Thread.sleep(2000);
		
		// switch back to parent window
		driver.switchTo().window(parentWindow);
		logger.log(LogStatus.INFO, "Switching back to parentWindow: "+parentWindow);
		Thread.sleep(2000);

		// ASSERTION: verify user is logged in
		Thread.sleep(1000);
		WebElement adminLogoutBtn = driver.findElement(By.xpath("//button[contains(text(),'Admin Logout')]"));
		Assert.assertEquals(true, adminLogoutBtn.isDisplayed());
		logger.log(LogStatus.PASS, "ASSERTION: verifying user successfully logged in");
		Thread.sleep(2000);
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

	@Parameters({ "username" })
	@AfterClass
	public void azureLogout(String username) throws InterruptedException {
		// click 'Admin' tab
		driver.findElement(By.xpath("//a[contains(text(),'Admin')]")).click();
		logger.log(LogStatus.INFO, "Clicking 'Admin' tab");
		Thread.sleep(1500);
		
		// click on 'Users' in dropdown menu
		driver.findElement(By.cssSelector("a[name='adminUsers']")).click();
		logger.log(LogStatus.INFO, "Clicking on 'Users' in dropdown menu");

		// Admin Logout
		driver.findElement(By.xpath("//button[contains(text(),'Admin Logout')]")).click();
		logger.log(LogStatus.INFO, "Clicking 'Admin Logout' button");
		Thread.sleep(2000);
		driver.findElement(By.xpath("//small[contains(text(),'"+username+"')]")).click();
		logger.log(LogStatus.INFO, "Clicking username");
		Thread.sleep(10000);

		// click 'Admin' tab
		driver.findElement(By.cssSelector("a[name='admin']")).click();
		logger.log(LogStatus.INFO, "Clicking 'Admin' tab");
		Thread.sleep(1000);

		// ASSERTION: verify user is logged out
		Thread.sleep(1000);
		WebElement adminLoginBtn = driver.findElement(By.xpath("//button[contains(text(),'Admin Login')]"));
		Assert.assertEquals(true, adminLoginBtn.isDisplayed());
		logger.log(LogStatus.PASS, "ASSERTION: verifying user successfully signed out");
		Thread.sleep(2000);

		// close browser and driver
		driver.close();
		driver.quit();
		logger.log(LogStatus.INFO, "Closing browser and driver");
		report.endTest(logger);
		report.flush();
	}
}
