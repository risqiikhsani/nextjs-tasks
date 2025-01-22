// import { AuthConfig } from "@auth/core"
// import * as crypto from 'crypto'
// import * as jose from 'jose'

// // Generate keys for testing (in production, you'd store these securely)
// // openssl genrsa -out private.pem 2048
// // openssl rsa -in private.pem -pubout -out public.pem

// const authConfig = {
//   providers: [], // Add your providers here
  
//   jwt: {
//     // Override default JWT encoding/decoding
//     encode: async ({ token, secret }) => {
//       // Read your private key (in production, use environment variables)
//       const privateKey = `-----BEGIN PRIVATE KEY-----
// YOUR_PRIVATE_KEY_HERE
// -----END PRIVATE KEY-----`

//       // Convert PEM to KeyLike format
//       const key = await jose.importPKCS8(privateKey, 'RS256')
      
//       // Create a new JWT
//       const jwt = await new jose.SignJWT(token)
//         .setProtectedHeader({ alg: 'RS256' })
//         .setIssuedAt()
//         .setExpirationTime('24h')
//         .sign(key)
      
//       return jwt
//     },
    
//     decode: async ({ token, secret }) => {
//       // Read your public key (in production, use environment variables)
//       const publicKey = `-----BEGIN PUBLIC KEY-----
// YOUR_PUBLIC_KEY_HERE
// -----END PUBLIC KEY-----`
      
//       if (!token) return null
      
//       try {
//         // Convert PEM to KeyLike format
//         const key = await jose.importSPKI(publicKey, 'RS256')
        
//         // Verify and decode the JWT
//         const { payload } = await jose.jwtVerify(token, key, {
//           algorithms: ['RS256']
//         })
        
//         return payload
//       } catch (error) {
//         console.error('JWT decode error:', error)
//         return null
//       }
//     }
//   },
  
//   // Additional security options
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60, // 24 hours
//   },
  
//   callbacks: {
//     async session({ session, token }) {
//       // You can modify the session here based on the token
//       return session
//     },
//     async jwt({ token, user }) {
//       // You can modify the token here
//       return token
//     }
//   }
// } satisfies AuthConfig

// export default authConfig