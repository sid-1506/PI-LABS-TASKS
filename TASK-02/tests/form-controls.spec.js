const { test, expect } = require('@playwright/test');

test.describe('Task 2 — Form Controls', () => {

  // Test 1: Checkboxes
  test('Test 1: Verify and toggle checkboxes', async ({ page }) => {
    // 1. Navigate to the checkboxes page
    await page.goto('/checkboxes');

    // 2. Locate both checkboxes using their role
    const checkboxes = page.getByRole('checkbox');
    const firstCheckbox = checkboxes.nth(0);
    const secondCheckbox = checkboxes.nth(1);

    // 3. Demonstrate not.toBeChecked() on the first checkbox (unchecked by default)
    await expect(firstCheckbox).not.toBeChecked();

    // 4. Verify the second checkbox is initially checked
    await expect(secondCheckbox).toBeChecked();

    // 5. Toggle first checkbox so its state becomes checked
    await firstCheckbox.check();

    // 6. Ensure both checkboxes are checked
    await secondCheckbox.check();

    // 7. Verify both checkboxes are checked in their final state
    await expect(firstCheckbox).toBeChecked();
    await expect(secondCheckbox).toBeChecked();
  });

  test('Test 2: Select options from dropdown by label and by value', async ({ page }) => {
    // 1. Navigate to the dropdown page
    await page.goto('/dropdown');

    // 2. Locate the dropdown element
    const dropdown = page.locator('#dropdown');

    // 3. Select an option by its visible label ('Option 1')
    await dropdown.selectOption({ label: 'Option 1' });

    // 4. Assert the selected value is '1'
    await expect(dropdown).toHaveValue('1');

    // 5. Select another option using its underlying value ('2')
    await dropdown.selectOption({ value: '2' });

    // 6. Assert the final selected value is '2'
    await expect(dropdown).toHaveValue('2');
  });

  // Test 3: Number input
  test('Test 3: Increment number input using arrow keys', async ({ page }) => {
    // 1. Navigate to the inputs page
    await page.goto('/inputs');

    // 2. Locate the number input using the standard accessible role 'spinbutton'
    const numberInput = page.getByRole('spinbutton');

    // 3. Enter the number 5
    await numberInput.fill('5');

    // 4. Press ArrowUp three times to increment the number
    await numberInput.press('ArrowUp');
    await numberInput.press('ArrowUp');
    await numberInput.press('ArrowUp');

    // 5. Assert that the final input value is 8
    await expect(numberInput).toHaveValue('8');
  });

});
