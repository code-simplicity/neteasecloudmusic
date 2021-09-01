// 对歌曲进行格式化处理
import utils from "../utils/utils"

export default class Song {
    // 构造歌曲的参数以及返回参数的形式，这样做的目的其实是为了点击专辑详情之后就可以直接格式化数据，返回正常的数据
    /**
     *  id, ==>id
        name, ==> 歌曲名
        singer, ==>歌手
        duration, ==>时长
        album,==>专辑
        image,==>图片
        url,==>播放地址
        playCount,==>播放次数
        score,==>评分
     * @param {*} param0 
     */
    constructor({
        id,
        name,
        singer,
        duration,
        album,
        image,
        url,
        playCount,
        score
    }) {
        this.id = id
        this.name = name
        this.singer = singer
        this.duration = duration
        this.album = album
        this.image = image
        this.url = url
        this.playCount = playCount
        this.score = score
    }
}

// 统一暴露一个方法
export function createSong(musicData) {
    // 返回一个新的实例对象
    return new Song({
        id: musicData.id,
        name: musicData.name,
        singer: filterSinger(musicData.ar || musicData.artists),
        duration: utils.formatSecond(musicData.dt || musicData.duration),
        album: musicData.al ? musicData.al.name : musicData.album.name,
        image: musicData.al ?
            musicData.al.picUrl :
            musicData.album.artist.img1v1Url,
        url: `https://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`,
        playCount: musicData.playCount || '',
        score: musicData.score || ''
    })
}

// 歌手处理
function filterSinger(singer) {
    let arr = []
    if (!singer) {
        return ''
    }
    singer.map(item => {
        arr.push(item.name)
    })
    return arr.join(' / ')
}