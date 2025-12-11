# Setting up PHP on Windows

It seems that PHP is not currently installed on your system. Here are the steps to get it ready:

## Option 1: Install XAMPP (Recommended for Beginners)
XAMPP is an easy-to-install distribution containing Apache, MySQL, and PHP.

1.  **Download XAMPP**: Go to [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html) and download the version for Windows.
2.  **Install**: Run the installer. You can stick to the default settings.
3.  **Start Servers**: Open the "XAMPP Control Panel" and click "Start" next to Apache.
4.  **Add to PATH** (Optional but recommended):
    *   Search for "Edit the system environment variables" in Windows Search.
    *   Click "Environment Variables".
    *   Under "System variables", find `Path` and click "Edit".
    *   Click "New" and add `C:\xampp\php` (or wherever you installed it).
    *   Click OK to save.

## Option 2: Manual PHP Installation
1.  Download the **Non-Thread Safe** or **Thread Safe** Zip from [https://windows.php.net/download/](https://windows.php.net/download/).
2.  Extract it to `C:\php`.
3.  Add `C:\php` to your System PATH (same steps as above).

## Verification
Once installed, open a new terminal in VS Code and run:
```powershell
php -v
```
You should see the PHP version.

## Running the Test Script
I have created a file named `test.php`. Once PHP is installed, you can run it with:
```powershell
php test.php
```
