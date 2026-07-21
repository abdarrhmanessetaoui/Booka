$TOKEN = "vcp_6hIpcVw0l0QPedWTYjWCS50v09lSA9T45cSei3NjMjwYkBoHmz1h17tQ"
$PROJECT_ID = "booka"

$envVars = @(
    @{ key = "NEXT_PUBLIC_BASE_URL"; value = "https://booka-ssetaouiabdarrhmane2004-1522s-projects.vercel.app" },
    @{ key = "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"; value = "pk_test_ZXF1YWwtbGlnZXItNTguY2xlcmsuYWNjb3VudHMuZGV2JA" },
    @{ key = "CLERK_SECRET_KEY"; value = "sk_test_hjniZmC2oz6HjDQCJMzSYUv9tzdNhkFbbXBJ7pvkzO" },
    @{ key = "NEXT_PUBLIC_CLERK_SIGN_IN_URL"; value = "/sign-in" },
    @{ key = "NEXT_PUBLIC_CLERK_SIGN_UP_URL"; value = "/sign-up" },
    @{ key = "NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL"; value = "/" },
    @{ key = "NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL"; value = "/" },
    @{ key = "MONGODB_URI"; value = "mongodb://abderrahmane:8uRqwy58AqEGfYxj@ac-e1ucyjz-shard-00-00.qiziptb.mongodb.net:27017,ac-e1ucyjz-shard-00-01.qiziptb.mongodb.net:27017,ac-e1ucyjz-shard-00-02.qiziptb.mongodb.net:27017/?ssl=true&replicaSet=atlas-jfb5j0-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Abderrahman" },
    @{ key = "NEXT_PUBLIC_ASSISTANT_ID"; value = "aa214f89-626b-4d0e-b96c-fd18ce8c5afb" },
    @{ key = "NEXT_PUBLIC_VAPI_PUBLIC_KEY"; value = "b12ad97a-e338-4e67-b190-50a244cf21cf" },
    @{ key = "BLOB_STORE_ID"; value = "store_Oq6LQuPWIjPbbebI" },
    @{ key = "BLOB_READ_WRITE_TOKEN"; value = "vercel_blob_rw_Oq6LQuPWIjPbbebI_4S4f42kWqmU3YaKPCo5ErH1dKtmbEr" }
)

foreach ($var in $envVars) {
    $body = @{
        key    = $var.key
        value  = $var.value
        type   = "encrypted"
        target = @("production", "preview", "development")
    } | ConvertTo-Json -Compress

    # Escape quotes for curl.exe
    $body = $body -replace '"', '\"'

    Write-Host "Adding $($var.key)..."
    curl.exe -s -X POST "https://api.vercel.com/v10/projects/$PROJECT_ID/env" `
        -H "Authorization: Bearer $TOKEN" `
        -H "Content-Type: application/json" `
        -d "$body"
    Write-Host "`n"
}

Write-Host "Triggering redeploy..."
$deployBody = @{
    name   = "booka"
    target = "production"
} | ConvertTo-Json -Compress
$deployBody = $deployBody -replace '"', '\"'

curl.exe -s -X POST "https://api.vercel.com/v13/deployments" `
    -H "Authorization: Bearer $TOKEN" `
    -H "Content-Type: application/json" `
    -d "$deployBody"
