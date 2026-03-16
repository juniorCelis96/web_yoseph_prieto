/**
 * Script to create admin user in Supabase Auth
 * 
 * This script uses the Supabase Management API to create an admin user.
 * 
 * Prerequisites:
 * 1. Install dependencies: npm install @supabase/supabase-js dotenv
 * 2. Set SUPABASE_SERVICE_ROLE_KEY in your .env file
 * 3. Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file
 * 
 * Usage:
 * node create-admin-user.js
 * 
 * Or run directly with environment variables:
 * SUPABASE_URL=your-url SUPABASE_SERVICE_ROLE_KEY=your-key ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=your-password node create-admin-user.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const adminEmail = process.env.ADMIN_EMAIL || 'admin@yosephprieto.com'
const adminPassword = process.env.ADMIN_PASSWORD

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
  process.exit(1)
}

if (!adminPassword) {
  console.error('❌ Error: ADMIN_PASSWORD must be set')
  console.log('💡 Tip: Set ADMIN_PASSWORD in your .env.local file')
  process.exit(1)
}

// Create Supabase client with service role key (admin privileges)
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdminUser() {
  try {
    console.log('🔄 Creating admin user...')
    console.log(`📧 Email: ${adminEmail}`)
    
    // Create user with admin metadata
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        role: 'admin',
        name: 'Administrator'
      }
    })

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('⚠️  User already exists. Updating user metadata...')
        
        // Get existing user
        const { data: users, error: listError } = await supabase.auth.admin.listUsers()
        if (listError) throw listError
        
        const existingUser = users.users.find(u => u.email === adminEmail)
        if (!existingUser) {
          throw new Error('User exists but could not be found')
        }
        
        // Update user metadata
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          existingUser.id,
          {
            user_metadata: {
              role: 'admin',
              name: 'Administrator'
            }
          }
        )
        
        if (updateError) throw updateError
        console.log('✅ User metadata updated successfully')
        console.log(`👤 User ID: ${existingUser.id}`)
        return
      }
      throw error
    }

    console.log('✅ Admin user created successfully!')
    console.log(`👤 User ID: ${data.user.id}`)
    console.log(`📧 Email: ${data.user.email}`)
    console.log('')
    console.log('🔐 Next steps:')
    console.log('1. Make sure ADMIN_EMAIL in your .env matches:', adminEmail)
    console.log('2. Test login at: /login/24f901ff-e665-44d4-9d9f-28c8ee059501')
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
    process.exit(1)
  }
}

createAdminUser()
