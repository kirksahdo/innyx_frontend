import axios from 'axios'

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      const errorData = error.response.data

      if (typeof errorData.error === 'string') {
        return errorData.error
      }

      if (typeof errorData.errors === 'object') {
        return String(Object.values(errorData.errors)[0]) || 'Erro desconhecido'
      }

      if (typeof errorData.message === 'string') {
        return errorData.message
      }
    }
    if (error.request) {
      return 'Não foi possível conectar ao servidor. Verifique sua conexão.'
    }
  }
  if (error instanceof Error) {
    return error.message
  }

  return 'Ocorreu um erro inesperado.'
}
