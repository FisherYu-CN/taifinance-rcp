import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl';
import Col from 'react-bootstrap/lib/Col';
import {connect} from 'react-redux';

@connect(
    state => ({
        navItems: state.sidebar.navItems,
        navItemsStatus: state.sidebar.navItemsStatus
    })
)
export default class Breadcrumb extends Component {

    static propTypes = {
        navItems: PropTypes.object,                 // 导航项信息
        navItemsStatus: PropTypes.object,          // 导航项状态
        children: PropTypes.element
    };

    /**
     * 获取标题组件
     *
     * @return {Object} 标题组件
     */
    getTitleComponent = (item) => {
        if (item) {
            return item.title ? item.title : <FormattedMessage id={item.titleId} />;
        }
    }

    render() {

        const {children, navItems, navItemsStatus} = this.props;

        // 查找激活的叶导航项
        let activatedLeafNavItem;
        for (let id in navItems) {
            if (navItems.hasOwnProperty(id) && !navItems[id].hasChildren && navItemsStatus[id].active) {
                activatedLeafNavItem = navItems[id];
            }
        }

        let breadcrumbNavItems = [];
        if (activatedLeafNavItem) {
            breadcrumbNavItems.push(activatedLeafNavItem);

            if (activatedLeafNavItem.parentId) {
                let parentNavItem = navItems[activatedLeafNavItem.parentId];
                while (parentNavItem) {
                    breadcrumbNavItems.push(parentNavItem);
                    if (parentNavItem.parentId) {
                        parentNavItem = navItems[parentNavItem.parentId];
                    } else {
                        break;
                    }
                }
            }

            // 如果不在首页，则需要添加首页的链接
            if (activatedLeafNavItem.href !== navItems.home.href) {
                breadcrumbNavItems.push(navItems.home);
            }
        }
        // 显示顺序与插入顺序相反
        breadcrumbNavItems = breadcrumbNavItems.reverse();

        // 获取标题栏
        let header;
        if (children) {
            header = children;
        } else {
            if (breadcrumbNavItems.length > 0) {
                header = this.getTitleComponent(breadcrumbNavItems[breadcrumbNavItems.length - 1]);
            }
        }

        return (
            <div className="row wrapper border-bottom white-bg page-heading">
                <Col lg={10}>
                    <h2>{header}</h2>
                    <ol className="breadcrumb">
                        {breadcrumbNavItems.map((item, index) => {
                            const titleComponent = this.getTitleComponent(item);
                            if (index === breadcrumbNavItems.length - 1 && !children) {
                                return (<li key={index}><strong>{titleComponent}</strong></li>);
                            }
                            return (<li key={index}><Link to={item.href ? item.href : ''}>{titleComponent}</Link></li>);
                        })}

                        {/** 如果自定义了子标题，则子标题为激活的一级 */}
                        {children && <li><strong>{children}</strong></li>}
                    </ol>
                </Col>
            </div>
        );
    }
}
