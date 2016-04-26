import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class SidebarNav extends Component {

    static propTypes = {
        level: PropTypes.number,                              // 所属菜单层级
        expand: PropTypes.bool,                               // 是否需要展开
        children: PropTypes.oneOfType([                       // 嵌套的具体菜单项
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ])
    };

    // 组件渲染逻辑
    render() {

        const {level, expand, children, ...props} = this.props;

        // 未指定level属性的表示为第一级菜单
        const currentLevel = !level ? 1 : level;

        const navClass = classNames({
            'nav': true,
            'tfmenu': currentLevel === 1,
            'nav-second-level': currentLevel === 2,
            'nav-third-level': currentLevel === 3,
            'hide': !expand && expand !== undefined     // 如不指定expand属性，则默认是展开
        });

        return (
            <ul className={navClass}>
                {React.Children.map(children, element => {
                    return React.cloneElement(element, {...props});
                })}
            </ul>
        );
    }
}
