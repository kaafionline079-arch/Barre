# Push website to GitHub: kaafionline079-arch/Barre
# Run: .\scripts\push-to-github.ps1

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot

Set-Location $repoRoot

Write-Host ""
Write-Host "=== Barre Portfolio - GitHub Push ===" -ForegroundColor Cyan
Write-Host "Repository: https://github.com/kaafionline079-arch/Barre-Portfolio" -ForegroundColor Gray
Write-Host ""

# Check git
if (-not (Test-Path ".git")) {
    Write-Host "ERROR: Not a git repository." -ForegroundColor Red
    exit 1
}

$status = git status --porcelain
if ($status) {
    Write-Host "Staging all changes..." -ForegroundColor Yellow
    git add .
    git commit -m "Update portfolio for deployment"
}

$ahead = git rev-list --count origin/main..HEAD 2>$null
if (-not $ahead) { $ahead = 0 }
Write-Host "Commits ready to push: $ahead" -ForegroundColor Gray

Write-Host ""
Write-Host "You need a GitHub Personal Access Token for: kaafionline079-arch" -ForegroundColor Yellow
Write-Host "Create at: https://github.com/settings/tokens" -ForegroundColor Gray
Write-Host "(Classic token -> repo access)" -ForegroundColor Gray
Write-Host ""

$token = Read-Host "Paste your GitHub token (input is hidden)" -AsSecureString
$tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
)

if ([string]::IsNullOrWhiteSpace($tokenPlain)) {
    Write-Host "ERROR: No token entered." -ForegroundColor Red
    exit 1
}

$remoteUrl = "https://kaafionline079-arch:$tokenPlain@github.com/kaafionline079-arch/Barre-Portfolio.git"

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan

git push $remoteUrl main --force-with-lease

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS! Code pushed to GitHub." -ForegroundColor Green
    Write-Host "Check: https://github.com/kaafionline079-arch/Barre-Portfolio" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next: Go to Vercel -> Import this repo -> Root Directory: frontend" -ForegroundColor Cyan
    Write-Host "Import vercel.env for environment variables" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "PUSH FAILED. Check token and repo access." -ForegroundColor Red
    exit 1
}

# Clear token from remote URL in git config (security)
git remote set-url origin https://github.com/kaafionline079-arch/Barre-Portfolio.git
