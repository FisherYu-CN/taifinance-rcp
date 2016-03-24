import React, {Component, PropTypes} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {FormattedMessage} from 'react-intl';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {SidebarNav, SidebarNavHeader, SidebarNavItem} from 'components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sidebarActions from 'redux/modules/sidebar';

@connect(
    state => ({
        pathname: state.routing.location.pathname
    }),
    dispatch => bindActionCreators(
        Object.assign({}, sidebarActions),
        dispatch
    )
)
export default class Sidebar extends Component {

    static propTypes = {
        pathname: PropTypes.string,
        selectSidebarNavItem: PropTypes.func
    };

    componentWillReceiveProps(nextProps) {
        // 在路由切换时，模拟一个导航项选择事件(即使url对应的导航项不存在)，从而更新侧边栏状态
        if (nextProps.pathname) {
            this.props.selectSidebarNavItem(null, nextProps.pathname);
        }
    }

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
                            <LinkContainer to="/portal/users/profile">
                                <MenuItem>
                                    <FormattedMessage id="sidenav.header.menus.profile" />
                                </MenuItem>
                            </LinkContainer>
                            <LinkContainer to="/portal/users/password">
                                <MenuItem>
                                    <FormattedMessage id="sidenav.header.menus.password" />
                                </MenuItem>
                            </LinkContainer>
                            <MenuItem divider />
                            <LinkContainer to="/api/auth/signout">
                                <MenuItem>
                                    <FormattedMessage id="sidenav.header.menus.signout" />
                                </MenuItem>
                            </LinkContainer>
                        </SidebarNavHeader>

                        { /* 侧边导航栏导航项 - 首页 */ }
                        <SidebarNavItem id="home" titleId="sidenav.home" href="/portal" iconClass="fa-home" />

                        { /* 侧边导航栏导航项 - 模型管理 */ }
                        <SidebarNavItem id="datamodels" titleId="sidenav.datamodel" href="/portal/datamodels" iconClass="fa-cubes">
                            <SidebarNav>
                                <SidebarNavItem id="datamodels.model" titleId="sidenav.datamodel.datamodel" href="/portal/datamodels" />
                                <SidebarNavItem id="datamodels.industry" titleId="sidenav.datamodel.industry" href="/portal/industries" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 银联数据 */ }
                        <SidebarNavItem id="unionpay" titleId="sidenav.unionpay" href="/portal/unionpay/idcard/validity" iconClass="fa-credit-card">
                            <SidebarNav>
                                <SidebarNavItem id="unionpay.idcard.validity" titleId="sidenav.unionpay.idcard.validity" href="/portal/unionpay/idcard/validity" />
                                <SidebarNavItem id="unionpay.bankcard.validity" titleId="sidenav.unionpay.bankcard.validity" href="/portal/unionpay/bankcard/validity" />
                                <SidebarNavItem id="unionpay.bankcard.usage" titleId="sidenav.unionpay.bankcard.usage" href="/portal/unionpay/bankcard/usage" />
                                <SidebarNavItem id="unionpay.portrait.individual" titleId="sidenav.unionpay.portrait.individual" href="/portal/unionpay/portrait/individual" />
                                <SidebarNavItem id="unionpay.portrait.enterprise" titleId="sidenav.unionpay.portrait.enterprise" href="/portal/unionpay/portrait/enterprise" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 电信运营商数据 */ }
                        <SidebarNavItem id="telecom" titleId="sidenav.telecom" href="/portal/telecom/phonenumber/validity" iconClass="fa-phone">
                            <SidebarNav>
                                <SidebarNavItem id="telecom.phonenumber.validity" titleId="sidenav.telecom.phonenumber.validity" href="/portal/telecom/phonenumber/validity" />
                                <SidebarNavItem id="telecom.phonenumber.amount" titleId="sidenav.telecom.phonenumber.amount" href="/portal/telecom/phonenumber/amount" />
                                <SidebarNavItem id="telecom.phonenumber.creditlevel" titleId="sidenav.telecom.phonenumber.creditlevel" href="/portal/telecom/phonenumber/creditlevel" />
                                <SidebarNavItem id="telecom.phonenumber.expense" titleId="sidenav.telecom.phonenumber.expense" href="/portal/telecom/phonenumber/expense" />
                                <SidebarNavItem id="telecom.phonenumber.arrearage" titleId="sidenav.telecom.phonenumber.arrearage" href="/portal/telecom/phonenumber/arrearage" />
                                <SidebarNavItem id="telecom.phonenumber.downtime" titleId="sidenav.telecom.phonenumber.downtime" href="/portal/telecom/phonenumber/downtime" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 工商数据 */ }
                        <SidebarNavItem id="industrycommerce" titleId="sidenav.industrycommerce" href="/portal/industrycommerce/individual" iconClass="fa-building">
                            <SidebarNav>
                                <SidebarNavItem id="industrycommerce.individual" titleId="sidenav.industrycommerce.individual" href="/portal/industrycommerce/individual" />
                                <SidebarNavItem id="industrycommerce.enterprise" titleId="sidenav.industrycommerce.enterprise" href="/portal/industrycommerce/enterprise" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 法院黑名单数据 */ }
                        <SidebarNavItem id="courtblacklist" titleId="sidenav.courtblacklist" href="/portal/courtblacklist/dishonestdebtor" iconClass="fa-legal">
                            <SidebarNav>
                                <SidebarNavItem id="courtblacklist.dishonestdebtor" titleId="sidenav.courtblacklist.dishonestdebtor" href="/portal/courtblacklist/dishonestdebtor" />
                                <SidebarNavItem id="courtblacklist.enforcement" titleId="sidenav.courtblacklist.enforcement" href="/portal/courtblacklist/enforcement" />
                            </SidebarNav>
                        </SidebarNavItem>

                        { /* 侧边导航栏导航项 - 系统管理 */ }
                        <SidebarNavItem id="system" titleId="sidenav.system" href="/portal/users" iconClass="fa-cogs">
                            <SidebarNav>
                                <SidebarNavItem id="users" titleId="sidenav.users" href="/portal/users" />
                                <SidebarNavItem id="roles" titleId="sidenav.roles" href="/portal/roles" />
                            </SidebarNav>
                        </SidebarNavItem>
                    </SidebarNav>
                </div>
            </nav>
        );
    }
}
