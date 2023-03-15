import {createMessage} from "@lib/BasicInteraction";
import TemplateItem from '@/components/TemplateItem/index.t';
import {set} from '@/lib/Storage';
import {CURRENT_TEMPLATE} from "@const/StorageKtys.t";

require('./style.t.scss');

const AppConfig = require('@/config/AppConfig');

export default {
    name: 'lmo-template_view',
    render(h) {
        return (
            h('div', {
                class: 'lmo-data_visualization_template_view'
            }, [
                h('el-dialog', {
                    props: {
                        title: '编辑模板信息',
                        visible: this.editTemplateVisible,
                        width: '20%',
                        'center': true,
                        'before-close': () => this.editTemplateVisible = false
                    }
                }, [
                    h('div', [
                        h('span', [
                            '模板标题',
                            h('lmo-input', {
                                props: {
                                    value: this.templateInfo.title
                                },
                                on: {
                                    change: e => this.templateInfo.title = e
                                }
                            })
                        ])
                    ]),
                    h('div', [
                        h('span', [
                            '模板介绍',
                            h('lmo-input', {
                                props: {
                                    value: this.templateInfo.description
                                },
                                on: {
                                    change: e => this.templateInfo.description = e
                                }
                            })
                        ])
                    ]),
                    h('span', {
                        slot: 'footer'
                    }, [
                        h('lmo-button', {
                            props: {
                                text: '确认'
                            },
                            on: {
                                click: () => this.$store.dispatch('EDIT_TEMPLATE', {...this.templateInfo}).then(res => {
                                    if (res.code === 200) {
                                        createMessage({
                                            type: 'success',
                                            message: '修改成功'
                                        });
                                        this.editTemplateVisible = false;
                                        this.getTemplate();
                                    }
                                })
                            }
                        })
                    ])
                ]),
                h('div', {
                    class: 'lmo-visualization_template animated fadeInUp'
                }, [
                    this.TemplateData.length === 0 ? <el-empty description="这里暂时啥也没有"></el-empty> :
                        <el-row gutter={24}>
                            {
                                this.TemplateData.map((i) => {
                                    return (
                                        <el-col span={4}>
                                            {
                                                h(TemplateItem, {
                                                    props: {
                                                        data: i
                                                    },
                                                    on: {
                                                        delItem: this.getTemplate,
                                                        edit: (data) => {
                                                            this.templateInfo = data;
                                                            this.editTemplateVisible = true;
                                                        },
                                                        click: async (i) => {
                                                            document.title = `设计-${i.title}`;
                                                            this.$store.commit('SET_CURRENT_TEMPLATE', i);
                                                            this.$store.commit('RESET_CURRENT_TEMPLATE_CONFIG');
                                                            this.$store.commit('RESET_TEMPLATE_CURRENT_AUDIO_CONFIG');
                                                            await set(CURRENT_TEMPLATE, JSON.stringify(i));
                                                            await require('@/utils').routerPush(this.$router, '/edit', 'push');
                                                        }
                                                    }
                                                })
                                            }
                                        </el-col>
                                    );
                                })
                            }
                        </el-row>
                ])
            ])
        );
    },
    data() {
        return {
            TemplateData: [],
            editTemplateVisible: false,
            templateInfo: {
                id: '',
                title: '',
                description: ''
            }
        };
    },
    methods: {
        getTemplate() {
            this.$store.dispatch('GET_TEMPLATE_LIST').then(res => {
                this.TemplateData = res.data.list;
            });
        }
    },
    activated() {
        document.title = AppConfig.appName;
        this.getTemplate();
    }
};