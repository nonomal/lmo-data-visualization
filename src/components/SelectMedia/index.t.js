require('./TempLate/style.t.scss');

import AudioList from "@components/SelectMedia/TempLate/AudioList.t";
import ImageList from "@components/SelectMedia/TempLate/ImageList";
import NoData from '@/components/NoData/index.t';
import {FILE_MAX_LENGTH} from "@/const/Const.t";
import {UPLOAD_SUCCESS, FILE_SIZE} from '@/const/Message';

export default {
    name: 'lmo-select-media',
    render(h) {
        return (
            h('el-dialog', {
                props: {
                    visible: this.showSelectMedia,
                    title: '选择媒体文件',
                    'before-close': () => {
                        this.showSelectMedia = false;
                    }
                }
            }, [
                h('div', {}, [
                    h('lmo-button', {
                        props: {
                            text: '上传'
                        },
                        on: {
                            click: () => {
                                require('@/utils/index').selectFile(false).then(file => {
                                    if (file.size > FILE_MAX_LENGTH)
                                        return this.$message.warning(FILE_SIZE.replace('$t', file.name));
                                    this.$store.dispatch('UPLOAD_MEDIA', {
                                        media: file
                                    }).then(res => {
                                        if (res.code === 200) {
                                            this.$message.success(UPLOAD_SUCCESS);
                                            this.getMedia();
                                        }
                                    });
                                });
                            }
                        }
                    })
                ]),
                h('el-tabs', {
                    props: {
                        value: this.tabsActiveName
                    },
                    on: {
                        'tab-click': (t) => {
                            this.tabsActiveName = t.name;
                        }
                    }
                }, [
                    this.template.map(i => {
                        if (this.showTab === i.name || this.showTab === '') {
                            return (
                                h('el-tab-pane', {
                                    props: {
                                        label: i.label,
                                        name: i.name
                                    }
                                }, [
                                    this.media[i.dataIndex].length === 0 ? h('div', [
                                        h(NoData)
                                    ]) : h(i.template, {
                                        props: {
                                            data: this.media[i.dataIndex]
                                        },
                                        on: {
                                            click: (e) => {
                                                this.$emit('select', e);
                                                this.show();
                                            }
                                        }
                                    })
                                ])
                            );
                        }
                    })
                ])
            ])
        );
    },
    props: {
        showTab: {
            type: String,
            default: ''
        }
    },
    methods: {
        show() {
            this.showSelectMedia = !this.showSelectMedia;
            if (this.showSelectMedia)
                this.getMedia();
        },
        getMedia() {
            this.$store.dispatch('GET_UPLOAD_MEDIA').then(res => {
                this.media = res.data;
            });
        }
    },
    created() {
        if (this.showTab !== '')
            this.tabsActiveName = this.showTab;
    },
    data() {
        return {
            showSelectMedia: false,
            media: {
                audioMedia: [],
                videoMedia: [],
                imageMedia: []
            },
            tabsActiveName: 'audio',
            template: [
                {
                    label: '音频',
                    name: 'audio',
                    dataIndex: 'audioMedia',
                    template: AudioList
                },
                {
                    label: '视频',
                    name: 'video',
                    dataIndex: 'videoMedia'
                },
                {
                    label: '图片',
                    name: 'image',
                    dataIndex: 'imageMedia',
                    template: ImageList
                }
            ]
        };
    }
};