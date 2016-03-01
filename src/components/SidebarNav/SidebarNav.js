import React, {Component, PropTypes} from 'react';

export default class SidebarNav extends Component {

    // 组件接受的属性
    static propTypes = {
        level: PropTypes.string,                // 标题
        children: PropTypes.string.object       // 嵌套的具体菜单项
    };

    // 组件渲染逻辑
    render() {

        const {level, children} = this.props;

        // 未指定level属性的表示为第一级菜单
        const currentLevel = !level ? 1 : level;

        let navClass;
        switch (currentLevel) {
            case 1:
                navClass = 'tfmenu';
                break;
            case 2:
                navClass = 'nav-second-level collpase in';
                break;
            default:
                navClass = 'nav-third-level collpase in';
        }

        return (
            <ul className={'nav ' + navClass}>
                {children.map(child => {
                    React.cloneElement(child, { level: currentLevel });
                })}
            </ul>
        );
    }
}
