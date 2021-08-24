<template>
<div class="p-recommend">
    <div class="p-recommend-header">
        <span class="p-recommend-text">
            <i class="iconfont icon-rementuijian-copy"></i>
            <span>推荐新音乐</span>
        </span>
        <span class="p-recommend-more">
            <span>更多</span>
            <i class="iconfont icon-gengduo"></i>
        </span>
    </div>
    <!-- 热门歌单列表,推荐歌单 -->
    <div>
        <NewSongList :songMusic="PopularList"></NewSongList>
    </div>
</div>
</template>

<script>
import NewSongList from '@/components/Home/NewSongList'
import {
    getNewSongs,
    getSongDetail
} from '@/api/service/api'
import {
    createSong
} from '@/model/song'
export default {
    name: 'RecommendNewSong',
    data() {
        return {
            limit: 10,
            PopularList: []
        }
    },
    components: {
        NewSongList,
    },
    mounted() {
        this.getNewSongs()
    },
    methods: {
        //  获取推荐歌单
        async getNewSongs() {
            try {
                let res = await getNewSongs(this.limit)
                // 获取推荐歌单id
                let list = []
                if (res.code === 200) {
                    res.result.map(item => {
                        list.push(item.id)
                    })
                }
                console.log('推荐歌单', res)
                console.log('推荐歌单list', list)
                this.getSongDetail(list)
            } catch (error) {
                console.log(error)
            }
        },
        // 获取歌曲列表
        async getSongDetail(idsList) {
            let time = new Date().valueOf()
            // id数组变为以逗号隔开的字符串
            idsList = idsList.join(',')
            try {
                let res = await getSongDetail(idsList, time)
                console.log('获取歌曲列表', res);
                // 处理歌曲
                this.PopularList = this.formatSongs(res.songs)
                console.log('this.PopularList', this.PopularList);
            } catch (error) {
                console.log(error)
            }
        },
        // 处理歌曲
        formatSongs(list) {
            let arr = []
            list.map(item => {
                if (item.id) {
                    arr.push(createSong(item))
                }
            })
            return arr
        }
    }
}
</script>

<style lang="less" scoped>
.p-recommend {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;

    .p-recommend-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid red;

        .p-recommend-text {
            font-size: 1.4rem;
            float: left;

            .icon-rementuijian-copy {
                font-size: 1.3rem;
                color: red;
                padding-right: 10px;
            }
        }

        .p-recommend-more {
            float: right;

            .icon-gengduo {
                font-size: 0.8rem;
                color: red;
                padding-left: 6px;

                &:hover {
                    color: #1890ff;
                }
            }
        }
    }
}
</style>
