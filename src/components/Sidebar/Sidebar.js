import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {SidebarNav, SidebarNavHeader, SidebarNavItem} from 'components';

export default class Sidebar extends Component {

    render() {

        // FIX: 暂时使用硬编码，之后再获取用户信息代替
        const name = 'Fisher Yu';
        const company = 'TaiFinance';
        const profileImageUrl = require('./profile.jpg');

        return (
            <nav className="navbar-default navbar-static-side">
                <div className="sidebar-collapse">
                    <SidebarNav>
                        { /* 侧边导航栏标题栏 */ }
                        <SidebarNavHeader name={name} company={company} profileImageUrl={profileImageUrl}>
                            <MenuItem href="/portal/users/profile">
                                <FormattedMessage id="sidebar.header.menus.profile" />
                            </MenuItem>
                            <MenuItem href="/portal/users/password">
                                <FormattedMessage id="sidebar.header.menus.password" />
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem href="/api/auth/signout">
                                <FormattedMessage id="sidebar.header.menus.signout" />
                            </MenuItem>
                        </SidebarNavHeader>

                        { /* 侧边导航栏导航项 - 首页 */ }
                        <SidebarNavItem id="home" titleId="sidebar.nav.home" href="/portal/home" iconClass="fa-home" />

                        { /* 侧边导航栏导航项 - 模型管理 */ }
                        <SidebarNavItem id="datamodels" titleId="sidebar.nav.datamodel" iconClass="fa-cubes">
                            <SidebarNav>
                                <SidebarNavItem id="datamodels.industry" titleId="sidebar.nav.datamodel.industry">
                                    <SidebarNav>
                                        <SidebarNavItem id="test11" title="Test11" href="/portal/test/test1/test11" />
                                        <SidebarNavItem id="test12" title="Test12" href="/portal/test/test1/test12" />
                                    </SidebarNav>
                                </SidebarNavItem>
                                <SidebarNavItem id="datamodels.model" titleId="sidebar.nav.datamodel.model" href="/portal/datamodels" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 银联数据 */ }
                        <SidebarNavItem id="unionpay" titleId="sidebar.nav.unionpay" iconClass="fa-credit-card">
                            <SidebarNav>
                                <SidebarNavItem id="unionpay.idcard.validity" titleId="sidebar.nav.unionpay.idcard.validity" href="/portal/unionpay/idcard/validity" />
                                <SidebarNavItem id="unionpay.bankcard.validity" titleId="sidebar.nav.unionpay.bankcard.validity" href="/portal/unionpay/bankcard/validity" />
                                <SidebarNavItem id="unionpay.bankcard.usage" titleId="sidebar.nav.unionpay.bankcard.usage" href="/portal/unionpay/bankcard/usage" />
                                <SidebarNavItem id="unionpay.portrait.individual" titleId="sidebar.nav.unionpay.portrait.individual" href="/portal/unionpay/portrait/individual" />
                                <SidebarNavItem id="unionpay.portrait.enterprise" titleId="sidebar.nav.unionpay.portrait.enterprise" href="/portal/unionpay/portrait/enterprise" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 电信运营商数据 */ }
                        <SidebarNavItem id="telecom" titleId="sidebar.nav.telecom" iconClass="fa-phone">
                            <SidebarNav>
                                <SidebarNavItem id="telecom.phonenumber.validity" titleId="sidebar.nav.telecom.phonenumber.validity" href="/portal/telecom/phonenumber/validity" />
                                <SidebarNavItem id="telecom.phonenumber.amount" titleId="sidebar.nav.telecom.phonenumber.amount" href="/portal/telecom/phonenumber/amount" />
                                <SidebarNavItem id="telecom.phonenumber.creditlevel" titleId="sidebar.nav.telecom.phonenumber.creditlevel" href="/portal/telecom/phonenumber/creditlevel" />
                                <SidebarNavItem id="telecom.phonenumber.expense" titleId="sidebar.nav.telecom.phonenumber.expense" href="/portal/telecom/phonenumber/expense" />
                                <SidebarNavItem id="telecom.phonenumber.arrearage" titleId="sidebar.nav.telecom.phonenumber.arrearage" href="/portal/telecom/phonenumber/arrearage" />
                                <SidebarNavItem id="telecom.phonenumber.downtime" titleId="sidebar.nav.telecom.phonenumber.downtime" href="/portal/telecom/phonenumber/downtime" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 工商数据 */ }
                        <SidebarNavItem id="industrycommerce" titleId="sidebar.nav.industrycommerce" iconClass="fa-building">
                            <SidebarNav>
                                <SidebarNavItem id="industrycommerce.individual" titleId="sidebar.nav.industrycommerce.individual" href="/portal/industrycommerce/individual" />
                                <SidebarNavItem id="industrycommerce.enterprise" titleId="sidebar.nav.industrycommerce.enterprise" href="/portal/industrycommerce/enterprise" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 法院黑名单数据 */ }
                        <SidebarNavItem id="courtblacklist" titleId="sidebar.nav.courtblacklist" iconClass="fa-legal">
                            <SidebarNav>
                                <SidebarNavItem id="courtblacklist.dishonestdebtor" titleId="sidebar.nav.courtblacklist.dishonestdebtor" href="/portal/courtblacklist/dishonestdebtor" />
                                <SidebarNavItem id="courtblacklist.enforcement" titleId="sidebar.nav.courtblacklist.enforcement" href="/portal/courtblacklist/enforcement" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 系统管理 */ }
                        <SidebarNavItem id="system" titleId="sidebar.nav.system" iconClass="fa-cogs">
                            <SidebarNav>
                                <SidebarNavItem id="users" titleId="sidebar.nav.users" href="/portal/users" />
                                <SidebarNavItem id="roles" titleId="sidebar.nav.roles" href="/portal/roles" />
                            </SidebarNav>
                        </SidebarNavItem>
                    </SidebarNav>
                </div>
            </nav>
        );
    }
}
