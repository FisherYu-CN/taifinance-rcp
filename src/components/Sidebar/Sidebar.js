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

                        { /* 侧边导航栏导航项 */ }
                        <SidebarNavItem id="home" titleId="sidebar.nav.home" href="/portal/home" iconClass="fa-home" />

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

                        <SidebarNavItem id="unionpay" titleId="sidebar.nav.unionpay" iconClass="fa-credit-card">
                            <SidebarNav>
                                <SidebarNavItem id="unionpay.idcard.validity" titleId="sidebar.nav.unionpay.idcard.validity" href="/portal/unionpay/idcard/validity" />
                                <SidebarNavItem id="unionpay.bankcard.validity" titleId="sidebar.nav.unionpay.bankcard.validity" href="/portal/unionpay/bankcard/validity" />
                                <SidebarNavItem id="unionpay.bankcard.usage" titleId="sidebar.nav.unionpay.bankcard.usage" href="/portal/unionpay/bankcard/usage" />
                                <SidebarNavItem id="unionpay.portrait.individual" titleId="sidebar.nav.unionpay.portrait.individual" href="/portal/unionpay/portrait/individual" />
                                <SidebarNavItem id="unionpay.portrait.enterprise" titleId="sidebar.nav.unionpay.portrait.enterprise" href="/portal/unionpay/portrait/enterprise" />
                            </SidebarNav>
                        </SidebarNavItem>
                    </SidebarNav>
                </div>
            </nav>
        );
    }
}
