import ycRequest from '../index'
import { IAccount, IloginResult } from './type'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' //用法
}

export function accountLoginRequest(account: IAccount) {
  return ycRequest.post<IDataType<IloginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return ycRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}
export function requestUserMenusByRoleId(id: number) {
  return ycRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
