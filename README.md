# Frieden Foundation Website 
This is the source code for the Frieden Foundation website. It is built using [SvelteKit](https://kit.svelte.dev/).

![GitHub repo size](https://img.shields.io/github/repo-size/Zaydo123/frieden)
![Build](https://github.com/Zaydo123/frieden/actions/workflows/docker-image.yml/badge.svg)


## Install

### For Development
Clone the repository
```
git clone https://github.com/Zaydo123/frieden
```
Install the dependencies
```
npm install
```
Run the development server
```
npm run dev
```
Run Pocketbase Instance in new terminal (install different [executable]("https://pocketbase.io/") if on different OS than MacOS)
```
cd pocketbase
./pocketbase serve
```

### For Deployment
#### Using Docker Compose
```
docker-compose up -d --build
```

#### Using Docker Run / Building Image
```
docker build -t frieden .
docker run -d -p 3000:3000 frieden
```
____
#### Requried Environment Variables
| Variable | Description |
|----------|-------------|
| PUBLIC_PB_URL | The URL of the public pocketbase instance (include trailing `/`) |
| PUBLIC_PUB_STRIPE_KEY | The publishable key for the Stripe API |
| SECRET_STRIPE_KEY | The secret key for the Stripe API |
|PUBLIC_WEB_URL | The URL of the website |
| SECRET_PB_ADMIN_EMAIL | The email of the admin user for the pocketbase instance |
| SECRET_PB_ADMIN_PASSWORD | The password of the admin user for the pocketbase instance |

