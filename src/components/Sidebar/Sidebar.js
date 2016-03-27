import React, {Component, PropTypes} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {intlShape, defineMessages} from 'react-intl';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {SidebarNav, SidebarNavHeader, SidebarNavItem} from 'components';

// 定义国际化信息
const messages = defineMessages({
    // 侧边导航栏标题栏菜单
    sideNavHeaderMenuProfile: {
        id: 'sidenav.header.menus.profile',
        defaultMessage: 'Profile Settings',
    },
    sideNavHeaderMenuPassword: {
        id: 'sidenav.header.menus.password',
        defaultMessage: 'Change Password',
    },
    sideNavHeaderMenuSignout: {
        id: 'sidenav.header.menus.signout',
        defaultMessage: 'Sign Out',
    },

    // 侧边导航栏 - 首页
    sideNavItemHome: {
        id: 'sidenav.home',
        defaultMessage: 'Home',
    },

    // 侧边导航栏 - 模型管理
    sideNavItemDatamodel: {
        id: 'sidenav.datamodel',
        defaultMessage: 'Data Model',
    },
    sideNavItemDatamodelManagement: {
        id: 'sidenav.datamodel.datamodel',
        defaultMessage: 'Manage Data Models',
    },
    sideNavItemIndustryManagement: {
        id: 'sidenav.datamodel.industry',
        defaultMessage: 'Manage Industries',
    },

    // 侧边导航栏 - 银联数据
    sideNavItemUnionPay: {
        id: 'sidenav.unionpay',
        defaultMessage: 'UnionPay Data',
    },
    sideNavItemValidateIdCard: {
        id: 'sidenav.unionpay.idcard.validity',
        defaultMessage: 'Validate ID Card',
    },
    sideNavItemValidateBankCard: {
        id: 'sidenav.unionpay.bankcard.validity',
        defaultMessage: 'Validate Bank Card',
    },
    sideNavItemLookupBankCardUsage: {
        id: 'sidenav.unionpay.bankcard.usage',
        defaultMessage: 'Lookup Bank Card Usage',
    },
    sideNavItemLookupIndividualPortrait: {
        id: 'sidenav.unionpay.portrait.individual',
        defaultMessage: 'Lookup Individual Portrait',
    },
    sideNavItemLookupEnterprisePortrait: {
        id: 'sidenav.unionpay.portrait.enterprise',
        defaultMessage: 'Lookup Enterprise Portrait',
    },

    // 侧边导航栏 - 电信数据
    sideNavItemTelecom: {
        id: 'sidenav.telecom',
        defaultMessage: 'Telecom Data',
    },
    sideNavItemValidatePhoneNumber: {
        id: 'sidenav.telecom.phonenumber.validity',
        defaultMessage: 'Validate Phone Number',
    },
    sideNavItemLookupPhoneNumberAmount: {
        id: 'sidenav.telecom.phonenumber.amount',
        defaultMessage: 'Lookup Phone Number Amount',
    },
    sideNavItemLookupPhoneNumberCreditLevel: {
        id: 'sidenav.telecom.phonenumber.creditlevel',
        defaultMessage: 'Lookup Phone Number Credit Level',
    },
    sideNavItemLookupPhoneNumberExpense: {
        id: 'sidenav.telecom.phonenumber.expense',
        defaultMessage: 'Lookup Phone Number Expense',
    },
    sideNavItemLookupPhoneNumberArrearage: {
        id: 'sidenav.telecom.phonenumber.arrearage',
        defaultMessage: 'Lookup Phone Number Arrearage',
    },
    sideNavItemLookupPhoneNumberDowntime: {
        id: 'sidenav.telecom.phonenumber.downtime',
        defaultMessage: 'Lookup Phone Number Downtime',
    },

    // 侧边导航栏 - 工商数据
    sideNavItemIndustryCommerce: {
        id: 'sidenav.industrycommerce',
        defaultMessage: 'Industry Commerce Data',
    },
    sideNavItemLookupIndividualHousehold: {
        id: 'sidenav.industrycommerce.individual',
        defaultMessage: 'Lookup Individual Household',
    },
    sideNavItemLookupEnterprise: {
        id: 'sidenav.industrycommerce.enterprise',
        defaultMessage: 'Lookup Enterprise',
    },

    // 侧边导航栏 - 法院黑名单
    sideNavItemCourtBlacklist: {
        id: 'sidenav.courtblacklist',
        defaultMessage: 'Court Blacklist Data',
    },
    sideNavItemLookupDishonestDebtor: {
        id: 'sidenav.courtblacklist.dishonestdebtor',
        defaultMessage: 'Lookup Dishonest Debtor',
    },
    sideNavItemLookupCourtEnforcement: {
        id: 'sidenav.courtblacklist.enforcement',
        defaultMessage: 'Lookup Court Enforcement',
    },

    // 侧边导航栏 - 系统管理
    sideNavItemSystemSettings: {
        id: 'sidenav.system',
        defaultMessage: 'System Settings',
    },
    sideNavItemUserManagement: {
        id: 'sidenav.users',
        defaultMessage: 'Manage Users',
    },
    sideNavItemRoleManagement: {
        id: 'sidenav.roles',
        defaultMessage: 'Manage Roles',
    }
});

export default class Sidebar extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,                      // 用户信息
        activePathname: PropTypes.string,                       // 当前URL路径
        navItems: PropTypes.object,                             // 侧边栏导航项集合
        navItemsStatus: PropTypes.object,                       // 侧边栏导航项状态集合
        toggleSidebar: PropTypes.func,                          // 切换侧边栏导航项展开/收起状态
        registerSidebarNavItem: PropTypes.func,                 // 注册一个侧边栏导航项
        unregisterSidebarNavItem: PropTypes.func,               // 反注册一个侧边栏导航项
        selectSidebarNavItem: PropTypes.func,                   // 选择侧边栏导航项
        intl: intlShape,                                        // 国际化API
    };

    componentWillReceiveProps(nextProps) {

        const {activePathname, selectSidebarNavItem} = this.props;

        // 在路由切换时，模拟一个导航项选择事件(即使url对应的导航项不存在)，从而更新侧边栏状态
        if (activePathname !== nextProps.activePathname) {
            selectSidebarNavItem(null, nextProps.activePathname);
        }
    }

    render() {

        const {user, intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <nav className="navbar-default navbar-static-side">
                <div className="sidebar-collapse">
                    <SidebarNav {...props}>
                        { /* 侧边导航栏标题栏 */ }
                        <SidebarNavHeader user={user}>
                            <LinkContainer to="/portal/users/profile">
                                <MenuItem>{formatMessage(messages.sideNavHeaderMenuProfile)}</MenuItem>
                            </LinkContainer>
                            <LinkContainer to="/portal/users/password">
                                <MenuItem>{formatMessage(messages.sideNavHeaderMenuPassword)}</MenuItem>
                            </LinkContainer>
                            <MenuItem divider />
                            <LinkContainer to="/api/auth/signout">
                                <MenuItem>{formatMessage(messages.sideNavHeaderMenuSignout)}</MenuItem>
                            </LinkContainer>
                        </SidebarNavHeader>

                        { /* 侧边导航栏导航项 - 首页 */ }
                        <SidebarNavItem id="home" title={formatMessage(messages.sideNavItemHome)} href="/portal" iconClass="fa-home" onlyActiveOnIndex />

                        { /* 侧边导航栏导航项 - 模型管理 */ }
                        <SidebarNavItem id="datamodels" title={formatMessage(messages.sideNavItemDatamodel)} href="/portal/datamodels" iconClass="fa-cubes">
                            <SidebarNav>
                                <SidebarNavItem id="datamodels.model" title={formatMessage(messages.sideNavItemDatamodelManagement)} href="/portal/datamodels" />
                                <SidebarNavItem id="datamodels.industry" title={formatMessage(messages.sideNavItemIndustryManagement)} href="/portal/industries" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 银联数据 */ }
                        <SidebarNavItem id="unionpay" title={formatMessage(messages.sideNavItemUnionPay)} href="/portal/unionpay/idcard/validity" iconClass="fa-credit-card">
                            <SidebarNav>
                                <SidebarNavItem id="unionpay.idcard.validity" title={formatMessage(messages.sideNavItemValidateIdCard)} href="/portal/unionpay/idcard/validity" />
                                <SidebarNavItem id="unionpay.bankcard.validity" title={formatMessage(messages.sideNavItemValidateBankCard)} href="/portal/unionpay/bankcard/validity" />
                                <SidebarNavItem id="unionpay.bankcard.usage" title={formatMessage(messages.sideNavItemLookupBankCardUsage)} href="/portal/unionpay/bankcard/usage" />
                                <SidebarNavItem id="unionpay.portrait.individual" title={formatMessage(messages.sideNavItemLookupIndividualPortrait)} href="/portal/unionpay/portrait/individual" />
                                <SidebarNavItem id="unionpay.portrait.enterprise" title={formatMessage(messages.sideNavItemLookupEnterprisePortrait)} href="/portal/unionpay/portrait/enterprise" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 电信运营商数据 */ }
                        <SidebarNavItem id="telecom" title={formatMessage(messages.sideNavItemTelecom)} href="/portal/telecom/phonenumber/validity" iconClass="fa-phone">
                            <SidebarNav>
                                <SidebarNavItem id="telecom.phonenumber.validity" title={formatMessage(messages.sideNavItemValidatePhoneNumber)} href="/portal/telecom/phonenumber/validity" />
                                <SidebarNavItem id="telecom.phonenumber.amount" title={formatMessage(messages.sideNavItemLookupPhoneNumberAmount)} href="/portal/telecom/phonenumber/amount" />
                                <SidebarNavItem id="telecom.phonenumber.creditlevel" title={formatMessage(messages.sideNavItemLookupPhoneNumberCreditLevel)} href="/portal/telecom/phonenumber/creditlevel" />
                                <SidebarNavItem id="telecom.phonenumber.expense" title={formatMessage(messages.sideNavItemLookupPhoneNumberExpense)} href="/portal/telecom/phonenumber/expense" />
                                <SidebarNavItem id="telecom.phonenumber.arrearage" title={formatMessage(messages.sideNavItemLookupPhoneNumberArrearage)} href="/portal/telecom/phonenumber/arrearage" />
                                <SidebarNavItem id="telecom.phonenumber.downtime" title={formatMessage(messages.sideNavItemLookupPhoneNumberDowntime)} href="/portal/telecom/phonenumber/downtime" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 工商数据 */ }
                        <SidebarNavItem id="industrycommerce" title={formatMessage(messages.sideNavItemIndustryCommerce)} href="/portal/industrycommerce/individual" iconClass="fa-building">
                            <SidebarNav>
                                <SidebarNavItem id="industrycommerce.individual" title={formatMessage(messages.sideNavItemLookupIndividualHousehold)} href="/portal/industrycommerce/individual" />
                                <SidebarNavItem id="industrycommerce.enterprise" title={formatMessage(messages.sideNavItemLookupEnterprise)} href="/portal/industrycommerce/enterprise" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 法院黑名单数据 */ }
                        <SidebarNavItem id="courtblacklist" title={formatMessage(messages.sideNavItemCourtBlacklist)} href="/portal/courtblacklist/dishonestdebtor" iconClass="fa-legal">
                            <SidebarNav>
                                <SidebarNavItem id="courtblacklist.dishonestdebtor" title={formatMessage(messages.sideNavItemLookupDishonestDebtor)} href="/portal/courtblacklist/dishonestdebtor" />
                                <SidebarNavItem id="courtblacklist.enforcement" title={formatMessage(messages.sideNavItemLookupCourtEnforcement)} href="/portal/courtblacklist/enforcement" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 系统管理 */ }
                        <SidebarNavItem id="system" title={formatMessage(messages.sideNavItemSystemSettings)} href="/portal/users" iconClass="fa-cogs">
                            <SidebarNav>
                                <SidebarNavItem id="users" title={formatMessage(messages.sideNavItemUserManagement)} href="/portal/users" />
                                <SidebarNavItem id="roles" title={formatMessage(messages.sideNavItemRoleManagement)} href="/portal/roles" />
                            </SidebarNav>
                        </SidebarNavItem>
                    </SidebarNav>
                </div>
            </nav>
        );
    }
}
