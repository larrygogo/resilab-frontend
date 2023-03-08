import {createContext} from 'react'
import {PureAbility} from '@casl/ability'
import {createContextualCan} from '@casl/react'

export type Action = 'manage' | 'access' | 'create' | 'read' | 'update' | 'delete'
export type Subject = string | string[]
export type AppAbility = PureAbility<[Action, Subject]>

export type AclType = {
  action: Action
  subject: Subject
}

export const AbilityContext = createContext<AppAbility>(undefined!)

export const Can = createContextualCan(AbilityContext.Consumer)
