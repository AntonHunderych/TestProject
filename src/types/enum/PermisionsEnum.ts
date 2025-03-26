import z from 'zod';

export enum Permissions {
  createTodo = 'createTodo',
  deleteTodo = 'deleteTodo',
  changeTodo = 'changeTodo',
  addPerformersTodo = 'addPerformersTodo',
  removePerformersTodo = 'removePerformersTodo',
  deleteWorkSpace = 'deleteWorkSpace',
  changeWorkSpace = 'changeWorkSpace',
  addUserToWorkSpace = 'addUserToWorkSpace',
  deleteUserFromWorkSpace = 'deleteUserFromWorkSpace',
  writeComment = 'writeComment',
  changeComment = 'changeComment',
  deleteComment = 'deleteComment',
  createRole = 'createRole',
  deleteRole = 'deleteRole',
  updateRole = 'updateRole',
  assignRole = 'assignRole',
  revokeRole = 'revokeRole',
  createTag = 'createTag',
  deleteTag = 'deleteTag',
  changeTag = 'changeTag',
  createCategory = 'createCategory',
  deleteCategory = 'deleteCategory',
  changeCategory = 'changeCategory',
  attachFile = 'attachFile',
  deleteFile = 'deleteFile',
  updateFile = 'updateFile',
  manageNotifications = 'manageNotifications',
  changeSettings = 'changeSettings',
}

export const PermissionsEnumSchema = z.nativeEnum(Permissions);
