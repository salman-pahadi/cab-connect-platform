# API Contracts

## Auth
POST /auth/request-otp  
POST /auth/verify-otp  

## Driver
POST /drivers/online  
POST /drivers/offline  
POST /drivers/location  

## Ride
POST /rides/request  
POST /rides/{id}/accept  
POST /rides/{id}/arrived  
POST /rides/{id}/start  
POST /rides/{id}/complete  
POST /rides/{id}/cancel  

## Admin
GET /admin/drivers  
POST /admin/drivers/{id}/approve  
POST /admin/drivers/{id}/block
