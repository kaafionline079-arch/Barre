# Push website to GitHub: kaafionline079-arch/Barre-Portfolio
# Run: .\scripts\push-to-github.ps1

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$repoUrl = "https://github.com/kaafionline079-arch/Barre.git"

Set-Location $repoRoot

Write-Host ""
Write-Host "=== Barre Portfolio - GitHub Push ===" -ForegroundColor Cyan
Write-Host "Repository: https://github.com/kaafionline079-arch/Barre" -ForegroundColor Gray
Write-Host ""

if (-not (Test-Path ".git")) {
    Write-Host "ERROR: Not a git repository." -ForegroundColor Red
    exit 1
}

# Clear old GitHub credentials (often causes "Authentication failed")
Write-Host "Clearing old GitHub login cache..." -ForegroundColor Gray
cmdkey /list 2>$null | Select-String "github" | ForEach-Object {
    if ($_ -match "target:(.+)") {
        $target = $matches[1].Trim()
        cmdkey /delete:$target 2>$null | Out-Null
    }
}

git remote set-url origin $repoUrl

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
Write-Host "TOKEN samee account: kaafionline079-arch" -ForegroundColor Yellow
Write-Host "1. Login GitHub as kaafionline079-arch" -ForegroundColor Gray
Write-Host "2. Open: https://github.com/settings/tokens?type=beta" -ForegroundColor Gray
Write-Host "3. Generate new token (classic)" -ForegroundColor Gray
Write-Host "4. Check ONLY: repo (full control)" -ForegroundColor Gray
Write-Host "5. Generate -> COPY token (starts with ghp_)" -ForegroundColor Gray
Write-Host ""
Write-Host "OR paste token in plain text below (Ctrl+V):" -ForegroundColor Yellow
Write-Host ""

$tokenPlain = Read-Host "GitHub token (ghp_...)"

$tokenPlain = $tokenPlain.Trim()

if ([string]::IsNullOrWhiteSpace($tokenPlain)) {
    Write-Host "ERROR: No token entered." -ForegroundColor Red
    exit 1
}

if ($tokenPlain -notmatch "^ghp_|^github_pat_") {
    Write-Host "WARNING: Token usually starts with ghp_ or github_pat_" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan

$env:GIT_TERMINAL_PROMPT = "0"
git -c "http.extraHeader=Authorization: Bearer $tokenPlain" push $repoUrl main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS! Code pushed to GitHub." -ForegroundColor Green
    Write-Host "Check: https://github.com/kaafionline079-arch/Barre" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next: Vercel -> Import repo -> Root Directory: frontend" -ForegroundColor Cyan
    Write-Host "Import vercel.env for environment variables" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "PUSH FAILED." -ForegroundColor Red
    Write-Host ""
    Write-Host "Try again:" -ForegroundColor Yellow
    Write-Host "- Login GitHub as kaafionline079-arch (not mohamedarap2024)" -ForegroundColor Gray
    Write-Host "- Create NEW classic token with 'repo' checked" -ForegroundColor Gray
    Write-Host "- Copy full token (no spaces)" -ForegroundColor Gray
    Write-Host "- Or upload ZIP from Desktop: Barre-Portfolio-upload.zip" -ForegroundColor Gray
    exit 1
}
