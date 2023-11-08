import hasPermi from './hasPermi';
import hasPermiAnd from './hasPermiAnd';
import hasRole from './hasRole';
import hasRoleAnd from './hasRoleAnd';
export default {
  install(app) {
    hasPermi(app);
    hasPermiAnd(app);
    hasRole(app);
    hasRoleAnd(app);
  }
};
