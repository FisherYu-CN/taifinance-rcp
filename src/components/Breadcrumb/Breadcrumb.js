import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {intlShape} from 'react-intl';
import Col from 'react-bootstrap/lib/Col';

export default class Breadcrumb extends Component {

    static propTypes = {
        subTitle: React.PropTypes.string,                       // 子级标题
        intl: intlShape,                                        // 国际化API
        navItems: PropTypes.object.isRequired,                  // 侧边栏导航项集合
        navItemsStatus: PropTypes.object.isRequired             // 侧边栏导航项状态集合
    };

    /**
     * 获取标题组件
     *
     * @return {Object} 标题组件
     */
    getTitle = (item) => {

        const {formatMessage} = this.props.intl;

        if (item) {
            return item.title ? item.title : formatMessage({id: item.titleId});
        }
    }

    render() {

        const {navItems, navItemsStatus, subTitle} = this.props;

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
        } else {
            if (navItems.home) {
                breadcrumbNavItems.push(navItems.home);
            }
        }
        // 显示顺序与插入顺序相反
        breadcrumbNavItems = breadcrumbNavItems.reverse();

        // 获取标题栏
        let header;
        if (subTitle) {
            header = subTitle;
        } else {
            if (breadcrumbNavItems.length > 0) {
                header = this.getTitle(breadcrumbNavItems[breadcrumbNavItems.length - 1]);
            }
        }

        return (
            <div className="row wrapper border-bottom white-bg page-heading">
                <Col lg={10}>
                    <h2>{header}</h2>
                    <ol className="breadcrumb">
                        {breadcrumbNavItems.map((item, index) => {
                            const titleComponent = this.getTitle(item);
                            if (index === breadcrumbNavItems.length - 1 && !subTitle) {
                                return (<li key={index}><strong>{titleComponent}</strong></li>);
                            }
                            return (<li key={index}><Link to={item.href ? item.href : ''}>{titleComponent}</Link></li>);
                        })}

                        {/** 如果自定义了子标题，则子标题为激活的一级 */}
                        {subTitle && <li><strong>{subTitle}</strong></li>}
                    </ol>
                </Col>
            </div>
        );
    }
}
