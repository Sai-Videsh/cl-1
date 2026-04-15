param(
  [string]$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [double]$ClipSeconds = 10.0,
  [double]$PosterAtSecond = 1.0
)

$ErrorActionPreference = "Stop"

$imagesDir = Join-Path $ProjectRoot "Images_videos"
$outDir = Join-Path $ProjectRoot "public\media"

$desktopIn = Join-Path $imagesDir "A Person Pouring Tea - Stock Video Free To Use HD 4K - Free Stock Videos (1080p, h264, youtube).mp4"
$mobileIn = Join-Path $imagesDir "ASMR Tea Pouring  Gentle Pour, Steam & Cup Sounds  Relaxing No Music - The Cutting Studio ASMR (720p, h264, youtube).mp4"

$desktopOut = Join-Path $outDir "hero-desktop.mp4"
$mobileOut = Join-Path $outDir "hero-mobile.mp4"
$desktopPoster = Join-Path $outDir "hero-desktop-poster.jpg"
$mobilePoster = Join-Path $outDir "hero-mobile-poster.jpg"

if (!(Test-Path $desktopIn)) { throw "Desktop input video not found: $desktopIn" }
if (!(Test-Path $mobileIn)) { throw "Mobile input video not found: $mobileIn" }

New-Item -ItemType Directory -Path $outDir -Force | Out-Null

Write-Host "Encoding desktop hero video..."
& ffmpeg -y -ss 0 -i $desktopIn -t $ClipSeconds `
  -an -c:v libx264 -profile:v high -pix_fmt yuv420p `
  -b:v 4M -maxrate 5M -bufsize 10M `
  -vf "scale=1920:-2:flags=lanczos" -movflags +faststart $desktopOut

Write-Host "Encoding mobile hero video..."
& ffmpeg -y -ss 0 -i $mobileIn -t $ClipSeconds `
  -an -c:v libx264 -profile:v high -pix_fmt yuv420p `
  -b:v 2M -maxrate 2500k -bufsize 5M `
  -vf "scale=720:-2:flags=lanczos" -movflags +faststart $mobileOut

Write-Host "Generating poster images..."
& ffmpeg -y -ss $PosterAtSecond -i $desktopOut -frames:v 1 -q:v 2 $desktopPoster
& ffmpeg -y -ss $PosterAtSecond -i $mobileOut -frames:v 1 -q:v 2 $mobilePoster

Write-Host "Verifying output specs..."
& ffprobe -v error -select_streams v:0 -show_entries stream=width,height,avg_frame_rate,bit_rate -of default=noprint_wrappers=1:nokey=0 $desktopOut
& ffprobe -v error -select_streams v:0 -show_entries stream=width,height,avg_frame_rate,bit_rate -of default=noprint_wrappers=1:nokey=0 $mobileOut

Write-Host "Done. Output files:"
Write-Host " - $desktopOut"
Write-Host " - $mobileOut"
Write-Host " - $desktopPoster"
Write-Host " - $mobilePoster"
