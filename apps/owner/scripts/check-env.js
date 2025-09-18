#!/usr/bin/env node

/**
 * Environment variables validation script
 * Run this script to check if all required environment variables are set
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Required environment variables
const requiredVars = {
  // Public variables
  'NEXT_PUBLIC_API_BASE_URL': 'API base URL for client-side requests',
  'NEXT_PUBLIC_APP_NAME': 'Application name displayed to users',
  'NEXT_PUBLIC_APP_URL': 'Application URL',
  'NEXT_PUBLIC_APP_VERSION': 'Application version',
  'NEXT_PUBLIC_ENVIRONMENT': 'Environment (development/staging/production)',
  
  // Server variables
  'DATABASE_URL': 'Database connection URL',
  'AUTH_COOKIE_NAME': 'Authentication cookie name',
  'AUTH_SECRET': 'Authentication secret key (min 32 characters)',
  'AUTH_URL': 'Authentication URL',
};

// Optional environment variables
const optionalVars = {
  'STRIPE_PUBLIC_KEY': 'Stripe public key for payments',
  'STRIPE_SECRET_KEY': 'Stripe secret key for payments',
  'STRIPE_WEBHOOK_SECRET': 'Stripe webhook secret',
  'SMTP_HOST': 'SMTP host for email sending',
  'SMTP_PORT': 'SMTP port for email sending',
  'SMTP_USER': 'SMTP username for email sending',
  'SMTP_PASS': 'SMTP password for email sending',
  'REDIS_URL': 'Redis URL for caching',
  'UPLOAD_DIR': 'Directory for file uploads',
  'MAX_FILE_SIZE': 'Maximum file size in bytes',
  'RATE_LIMIT_WINDOW_MS': 'Rate limiting window in milliseconds',
  'RATE_LIMIT_MAX_REQUESTS': 'Maximum requests per window',
};

function checkEnvironmentVariables() {
  console.log('🔍 Checking environment variables...\n');
  
  let hasErrors = false;
  let hasWarnings = false;
  
  // Check required variables
  console.log('📋 Required variables:');
  for (const [varName, description] of Object.entries(requiredVars)) {
    const value = process.env[varName];
    if (!value || value.trim() === '') {
      console.log(`  ❌ ${varName}: Missing`);
      console.log(`     Description: ${description}`);
      hasErrors = true;
    } else {
      console.log(`  ✅ ${varName}: Set`);
    }
  }
  
  console.log('\n📋 Optional variables:');
  for (const [varName, description] of Object.entries(optionalVars)) {
    const value = process.env[varName];
    if (!value || value.trim() === '') {
      console.log(`  ⚠️  ${varName}: Not set`);
      console.log(`     Description: ${description}`);
      hasWarnings = true;
    } else {
      console.log(`  ✅ ${varName}: Set`);
    }
  }
  
  // Check specific validations
  console.log('\n🔍 Validating specific variables:');
  
  // Check AUTH_SECRET length
  const authSecret = process.env.AUTH_SECRET;
  if (authSecret && authSecret.length < 32) {
    console.log(`  ❌ AUTH_SECRET: Too short (${authSecret.length} chars, need at least 32)`);
    hasErrors = true;
  } else if (authSecret) {
    console.log(`  ✅ AUTH_SECRET: Valid length (${authSecret.length} chars)`);
  }
  
  // Check URLs
  const urlVars = ['NEXT_PUBLIC_API_BASE_URL', 'NEXT_PUBLIC_APP_URL', 'AUTH_URL', 'DATABASE_URL'];
  for (const varName of urlVars) {
    const value = process.env[varName];
    if (value) {
      try {
        new URL(value);
        console.log(`  ✅ ${varName}: Valid URL`);
      } catch (error) {
        console.log(`  ❌ ${varName}: Invalid URL format`);
        hasErrors = true;
      }
    }
  }
  
  // Summary
  console.log('\n📊 Summary:');
  if (hasErrors) {
    console.log('  ❌ Environment validation failed!');
    console.log('  💡 Make sure to:');
    console.log('     1. Copy .env.example to .env.local');
    console.log('     2. Fill in all required variables');
    console.log('     3. Check variable formats (URLs, lengths, etc.)');
    process.exit(1);
  } else if (hasWarnings) {
    console.log('  ⚠️  Environment validation passed with warnings');
    console.log('  💡 Consider setting optional variables for full functionality');
    process.exit(0);
  } else {
    console.log('  ✅ All environment variables are properly configured!');
    process.exit(0);
  }
}

// Run the check
checkEnvironmentVariables();
