# Check if PHP is installed
if (Get-Command "php" -ErrorAction SilentlyContinue) {
    Write-Host "PHP is already installed." -ForegroundColor Green
    php -v
} else {
    Write-Host "PHP not found. Attempting to install via Winget..." -ForegroundColor Yellow
    try {
        # Install PHP using Winget
        winget install PHP.PHP --accept-source-agreements --accept-package-agreements
        
        Write-Host "Installation command finished. You may need to restart your terminal or computer to update the PATH." -ForegroundColor Yellow
        Write-Host "After restarting, try running 'php -v' to verify." -ForegroundColor Yellow
    } catch {
        Write-Host "Failed to install PHP via Winget. Please install it manually." -ForegroundColor Red
        Write-Host "Download from: https://windows.php.net/download/" -ForegroundColor Red
    }
}

Write-Host "`nTo test your PHP installation, run: php test.php" -ForegroundColor Cyan
