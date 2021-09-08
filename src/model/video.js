// 处理视频
import utils from '../utils/utils'

export default class Video {
    constructor({
        id,
        nickName,
        name,
        playCount,
        duration,
        image,
        isLive
    }) {
        (this.id = id),
        (this.nickName = nickName),
        (this.name = name),
        (this.playCount = playCount),
        (this.duration = duration),
        (this.image = image),
        (this.isLive = isLive)
    }
}

export function createVideo(data) {
    if (data.duration > 0) {
        data.duration = utils.formatTime(data.duration)
    }
    return new Video({
        id: data.id,
        nickName: data.nickName,
        name: data.name,
        playCount: data.playCount,
        duration: data.duration,
        image: data.image,
        isLive: data.isLive
    })
}