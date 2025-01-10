import { User as UserType } from '@prisma/client'
import { create } from 'zustand'

interface DataState {
  data: UserType | undefined
  setData: (data: UserType) => void
}

export const useDataStore = create<DataState>((set) => ({
  data: undefined,
  setData: (data) => set({ data }),
}))