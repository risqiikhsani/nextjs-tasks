import { ClassEnrollment as ClassEnrollmentType, OrganizationMember as OrganizationMemberType, User as UserType } from '@prisma/client'
import { create } from 'zustand'

interface DataState {
  user: UserType | undefined
  setUser: (user: UserType) => void
  orgs:OrganizationMemberType[] | undefined
  setOrganizations : (orgs:OrganizationMemberType[]) => void
  enrollments: ClassEnrollmentType[] | undefined
  setClasses: (enrollments: ClassEnrollmentType[]) => void
}

export const useDataStore = create<DataState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  orgs: undefined,
  setOrganizations: (orgs) => set({ orgs }),
  enrollments: undefined,
  setClasses: (enrollments) => set({ enrollments })
}))