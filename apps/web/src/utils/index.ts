export const gqlClient =
  <TData, TVariables>(
    query: string,
    variables?: TVariables
  ): (() => Promise<TData>) =>
  async () => {
    // TODO: make url to env variable
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/graphql`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0] || 'Error..'
      throw new Error(message)
    }

    return json.data
  }
