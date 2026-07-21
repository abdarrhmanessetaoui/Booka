$TOKEN = "vcp_6hIpcVw0l0QPedWTYjWCS50v09lSA9T45cSei3NjMjwYkBoHmz1h17tQ"
$PROJECT_ID = "booka"

$envVars = @(
    @{ key = "MONGODB_URI"; value = "mongodb://abderrahmane:8uRqwy58AqEGfYxj@ac-e1ucyjz-shard-00-00.qiziptb.mongodb.net:27017,ac-e1ucyjz-shard-00-01.qiziptb.mongodb.net:27017,ac-e1ucyjz-shard-00-02.qiziptb.mongodb.net:27017/?ssl=true&replicaSet=atlas-jfb5j0-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Abderrahman"; type = "encrypted" },
    @{ key = "NEXT_PUBLIC_BASE_URL"; value = "https://booka-ssetaouiabdarrhmane2004-1522s-projects.vercel.app"; type = "plain" },
    @{ key = "NEXT_PUBLIC_CLERK_SIGN_IN_URL"; value = "/sign-in"; type = "plain" },
    @{ key = "NEXT_PUBLIC_CLERK_SIGN_UP_URL"; value = "/sign-up"; type = "plain" },
    @{ key = "NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL"; value = "/"; type = "plain" },
    @{ key = "NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL"; value = "/"; type = "plain" },
    @{ key = "NEXT_PUBLIC_ASSISTANT_ID"; value = "aa214f89-626b-4d0e-b96c-fd18ce8c5afb"; type = "plain" },
    @{ key = "NEXT_PUBLIC_VAPI_PUBLIC_KEY"; value = "b12ad97a-e338-4e67-b190-50a244cf21cf"; type = "plain" }
)

$headers = @{
    Authorization = "Bearer $TOKEN"
    "Content-Type" = "application/json"
}

Write-Host "=== Configuration des variables d'environnement Vercel ===" -ForegroundColor Cyan

foreach ($var in $envVars) {
    $body = @{
        key    = $var.key
        value  = $var.value
        type   = $var.type
        target = @("production", "preview", "development")
    } | ConvertTo-Json

    try {
        $response = Invoke-WebRequest `
            -Uri "https://api.vercel.com/v10/projects/$PROJECT_ID/env" `
            -Method POST `
            -Headers $headers `
            -Body $body `
            -UseBasicParsing `
            -ErrorAction Stop

        Write-Host "[OK] $($var.key)" -ForegroundColor Green
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 409) {
            Write-Host "[EXISTE DEJA] $($var.key)" -ForegroundColor Yellow
        } else {
            Write-Host "[ERREUR $statusCode] $($var.key): $_" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "=== Recuperation de la liste des deployements ===" -ForegroundColor Cyan

try {
    $deployments = Invoke-WebRequest `
        -Uri "https://api.vercel.com/v6/deployments?projectId=$PROJECT_ID&limit=1" `
        -Headers $headers `
        -UseBasicParsing `
        -ErrorAction Stop

    $data = $deployments.Content | ConvertFrom-Json
    $lastDeployment = $data.deployments[0]
    $deployId = $lastDeployment.uid

    Write-Host "Dernier deploiement: $deployId ($($lastDeployment.url))" -ForegroundColor White

    Write-Host ""
    Write-Host "=== Lancement du redeploiement ===" -ForegroundColor Cyan

    $redeployBody = @{
        name      = $lastDeployment.name
        deploymentId = $deployId
        target    = "production"
    } | ConvertTo-Json

    $redeploy = Invoke-WebRequest `
        -Uri "https://api.vercel.com/v13/deployments?forceNew=1&withLatestCommit=1" `
        -Method POST `
        -Headers $headers `
        -Body $redeployBody `
        -UseBasicParsing `
        -ErrorAction Stop

    $redeployData = $redeploy.Content | ConvertFrom-Json
    Write-Host "[SUCCES] Deploiement lance!" -ForegroundColor Green
    Write-Host "URL: https://$($redeployData.url)" -ForegroundColor Cyan
} catch {
    Write-Host "[ERREUR] Impossible de lancer le deploiement: $_" -ForegroundColor Red
}
