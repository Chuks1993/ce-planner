import { render, waitFor, screen } from '@src/mocks/utils'
import { AddReminderForm } from '.'

describe('AddReminderForm', () => {
  render(<AddReminderForm />)
  test('should render button', async () => {
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /add reminder/i })
      ).toBeInTheDocument()
    )
  })
})
