import { ClassEnrollment as ClassEnrollmentType, User as UserType } from '@prisma/client'
import { create } from 'zustand'

interface DataState {
  user: UserType | undefined
  enrollments: ClassEnrollmentType[] | undefined
  setUser: (user: UserType) => void
  setEnrollments: (enrollments: ClassEnrollmentType[]) => void
}

export const useDataStore = create<DataState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  enrollments: undefined,
  setEnrollments: (enrollments) => set({ enrollments })
}))