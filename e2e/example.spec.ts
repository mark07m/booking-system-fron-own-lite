import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Booking System/)
})

test('get started link', async ({ page }) => {
  await page.goto('/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
})

test('login form', async ({ page }) => {
  await page.goto('/login')

  // Check if login form is visible
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible()
  
  // Fill in login form
  await page.getByLabel(/email/i).fill('test@example.com')
  await page.getByLabel(/password/i).fill('password123')
  
  // Submit form
  await page.getByRole('button', { name: /login/i }).click()
  
  // Check for error or success message
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible()
})

test('responsive design', async ({ page }) => {
  await page.goto('/')
  
  // Test desktop view
  await page.setViewportSize({ width: 1200, height: 800 })
  await expect(page.locator('nav')).toBeVisible()
  
  // Test mobile view
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible()
})
