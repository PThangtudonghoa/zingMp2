const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const audio = $('#audio')
const toggle_btn = $('.music-controll')
const heading = $('.header h2')
const cdImg = $('.avatar img')
const music = $('#audio')
const input = $('.progress input')
const nextbtn = $('.next-btn')
const backbtn = $('.back-btn')
const palymusic = false
const random = $('.random')
const repeat = $('.repeat')
const songList = $('.song-list')
const songItem = $('.song-item')
const seeMore = $('.see-more')
var circleCD
var activeRepeat = false
var randombtn = false


const app = {
    currentIndex: 0,
    songList: [
        {
            name: 'Someone you Loved',
            cd: './assets/img/Someone-you-loved.jpg',
            singer: 'Madilyn Bailey',
            path: './assets/audio/Someone-You-Loved.mp3',
        },
        {
            name: 'Perfect',
            cd: './assets/img/perfect.jpg',
            singer: 'Ed Sheeren',
            path: './assets/audio/Perfect - Ed Sheeran (NhacPro.net).mp3',
        },
        {
            name: 'I Do',
            cd: './assets/img/i-do.jpg',
            singer: '911',
            path: './assets/audio/I-Do-911.mp3',
        },
        {
            name: 'Reality',
            cd: './assets/img/reality.jpg',
            singer: 'Lost Frequencies',
            path: './assets/audio/Reality-Lost-Frequencies-Janieck-Devy.mp3',
        },
        {
            name: 'Faded',
            cd: './assets/img/faded-img.jpeg',
            singer: 'Alan Walker',
            path: './assets/audio/Faded-Remix-Alan-Walker-RH-remix.mp3',
        },
        {
            name: 'On My Way',
            cd: './assets/img/on-my-way.jpg',
            singer: 'Alan Walker',
            path: './assets/audio/OnMyWay-AlanWalkerSabrinaCarpenterFarruko-5919403.mp3',
        },
        {
            name: 'Summer time',
            cd: './assets/img/k-391.jpg',
            singer: 'K-391',
            path: './assets/audio/Summertime-K-391.mp3',
        },
        {
            name: 'The Spectre',
            cd: './assets/img/spectre.jpg',
            singer: 'Alan Walker',
            path: './assets/audio/TheSpectre-AlanWalker-5168081.mp3',
        },
    ],
    handleEvent: function() {
        const img = $('.avatar')
        const widthImg = img.offsetWidth
        document.onscroll = function() {
        const scroll = window.scrollY || document.documentElement.scrollTop
        const newImg = widthImg - scroll
            if (newImg < 0) {
                img.style.width = 0
                img.style.opacity = newImg / widthImg
            }
            img.style.width = newImg + 'px'
            img.style.opacity = newImg / widthImg        
        }
        const _this = this

        // Xử lý quay cd
        circleCD = cdImg.animate([{transform: 'rotate(360deg)' }],{duration: 10000, iterations: Infinity,})
        circleCD.pause()
        // Xử lý nút play and Pause
        
        const play = $('.play')
        play.onclick = function() {
            music.play()
            toggle_btn.classList.add('toggle-play')
        }
        const Pause = $('.pause')
        Pause.onclick = function() {
            music.pause()
            toggle_btn.classList.remove('toggle-play')
        }
        music.onplay = function() {
            toggle_btn.classList.add('toggle-play')
            console.log('play')
            circleCD.play()
        }
        
        music.onpause = function() {
            toggle_btn.classList.remove('toggle-play')
            console.log('pause')
            circleCD.pause()
        }

        // Xử lý input range chạy theo nhạc 
        music.ontimeupdate = function() {
            input.value = 0
            const currenTime = (music.currentTime / music.duration)*100
            input.value = currenTime  
        }

        // Xử lý nhạc chạy theo inputrange
        input.onchange = function() {
            const currenValue = input.value
            music.currentTime = currenValue * music.duration / 100
        }

        // Xử lý nút next
        nextbtn.onclick = function() {
            if(randombtn) {
                _this.randomSong()
                _this.currentSong()
                music.play()
            } else {
                _this.currentIndex ++
            
                if(_this.currentIndex >= _this.songList.length) {
                _this.currentIndex = 0
                }
                _this.currentSong()
                _this.render()
                music.play()
            }
        }
        // Xử lý nút back
        backbtn.onclick = function() {
            if(randombtn) {
                _this.randomSong()
                _this.currentSong()
                music.play()
            } else {
                _this.currentIndex --
                if(_this.currentIndex < 0) {
                    _this.currentIndex = _this.songList.length
                }
                _this.currentSong()
                _this.render()
                music.play()
            }
            
        }

        // Xử lý nút random
        
        random.onclick = function() {
            random.classList.toggle('active')
            const active = $('.active')
            if(active) {
                randombtn = true
            } else {
                randombtn = false
            }
        }

        // Xử lý nút repeat
        repeat.onclick = function() {
            repeat.classList.toggle('activeRepeat')
            const activeBtn = $('.activeRepeat')
            if(activeBtn) {
                activeRepeat = true
            } else {
                activeRepeat = false
            }
        }

        // Xử lý âm lượng
        
        // Xử lý nút space
        
    },
    
    activeSong: function() {
        const _this= this
        songList.onclick = function(e) {
            const getSongItem = e.target.closest('.song-item:not(.activeSong)') 
            if(getSongItem && !e.target.closest('.song-more-icon')) {
                _this.currentIndex = Number(getSongItem.getAttribute('data-index'))
                _this.currentSong()
                _this.render()
                music.play()
            } else {
                
            }
            
            
        } 
        
    },

    nextSong: function() {
        const _this= this
        music.onended = function() {
            if(activeRepeat) {
                music.play()
            } else {
                if(randombtn) {
                    _this.randomSong()
                    _this.currentSong()
                    _this.render()
                    music.play()
                } else {
                    _this.currentIndex ++
                
                    if(_this.currentIndex >= _this.songList.length) {
                    _this.currentIndex = 0
                    }
                    _this.currentSong()
                    _this.render()
                    music.play()
                }
            }
        }
    },

    getVolum: function() {
        const getInputVolume = $('.volum input')
        const volumeMax = $('.fa-volume-up')
        const volumeMin = $('.fa-volume-mute')
        getInputVolume.onchange = function() {
            music.volume = getInputVolume.value / 100
            if(music.volume === 0) {
                volumeMax.classList.add('dislay-volum-max')
                volumeMin.classList.add('dislay-volum-min')
                console.log('min')
            } else {
                console.log('max')
                volumeMax.classList.remove('dislay-volum-max')
                volumeMin.classList.remove('dislay-volum-min')
            }
        }

        
        
    },
    
    getcurrentSong: function() {
        return this.songList[this.currentIndex]
    }, 

    currentSong: function() {

        heading.innerText = `${this.getcurrentSong().name}`
        cdImg.src = `${this.getcurrentSong().cd}`
        music.src = `${this.getcurrentSong().path}`
    },
    randomSong: function() {
        let newCurrentIndex
        do {
            newCurrentIndex = Math.floor(Math.random() * this.songList.length)
        }
        while(newCurrentIndex === this.currentIndex)
        this.currentIndex = newCurrentIndex
    },
    render: function() {
        const songList = $('.song-list')
        const htmls = app.songList.map((song, index) => {
            return `
            <div class="song-item ${index === this.currentIndex ? 'activeSong' : ''}" data-index="${index}">
                <img src="${song.cd}" alt="">
                <div class="song-name">
                    <h2>${song.name}</h2>
                    <h4>${song.singer}</h4>
                </div>
                <div class="song-more-icon"><i onclick="moreOption()" class="fas fa-ellipsis-h"></i></div>
            </div>
            `
        })
        songList.innerHTML = htmls.join('')

    },

    start: function() {
        this.handleEvent()
        this.render()
        this.currentSong()
        this.nextSong()
        this.activeSong()
        this.getVolum()
    }
}

app.start()

function moreOption() {
    seeMore.classList.add('display')
}
const overlay = $('.overlay')
overlay.onclick = function() {
seeMore.classList.remove('display')
}
const down = $('.fa-chevron-down')
down.onclick = function() {
    seeMore.classList.remove('display')
}

function optionItem4() {
    alert(':(')
}
function optionItem1() {
    alert('<3 <3 <3')
}
function optionItem2() {
    alert('reng reng')
}

function optionItem3() {
    alert('Không được phép tải về')
}

function optionItem5() {
    alert('Lỗi cái đ\' :))')
}


function clock() {
    alert('Đồng hồ bị hư !!!')
}

function share() {
    alert('Đã chia sẻ lên trang cá nhân của bạn')
}