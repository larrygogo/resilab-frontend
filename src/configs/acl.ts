/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
import {AbilityBuilder, PureAbility} from '@casl/ability';
import {AclType, AppAbility} from "src/@core/context/AbilityContext";

export const defaultAbility: AclType = {
  action: 'access',
  subject: 'all'
}

const defineAbility = (ability: AppAbility, user: any) => {
  const { can, rules } = new AbilityBuilder<AppAbility>(PureAbility)
  if (user.role === 'admin') {
    can('manage', 'all');
    can('access', 'dashboard');
    can('access', 'purchase');
  } else {
    can('access', 'dashboard');
    can('access', 'purchase');
  }
  ability.update(rules);
}

export default defineAbility;
