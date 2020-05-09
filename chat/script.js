function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nl2br(str) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function executeRecursive(callback, amount) {
    if (amount) {
        callback();
        executeRecursive(callback, --amount);
    }
}

var $chatBoxContent = $('#chatBoxContent');
var $chatBoxOverflow = $('#chatBoxOverflow');

var App = new Vue({
    el: '#AppVue',
    data: {
        chat: {
            hasNpcPanel: false,
            form: {
                message: 'Teste aqui',
            },
            messages: {
                list: [],
            },
        },
    },
    methods: {

        chatSendMessage: function () {
            alert('chatSendMessage');
        },

        chatOpenOptions: function () {
            alert('chatOpenOptions');
        },

        getScrollTop: function () {
            // const contentScrollTop = $chatBoxContent.scrollTop();
            // const contentScrollHeight = $chatBoxContent[0].scrollHeight;
            // const contentOuterHeight = $chatBoxContent.outerHeight();
            const contentScrollTop = document.getElementById('chatBoxContent').scrollTop;
            const contentScrollHeight = document.getElementById('chatBoxContent').scrollHeight;
            const contentOuterHeight = document.getElementById('chatBoxContent').offsetHeight;

            // const overflowScrollTop = $chatBoxOverflow.scrollTop();
            // const overflowScrollHeight = $chatBoxOverflow[0].scrollHeight;
            // const overflowOuterHeight = $chatBoxOverflow.outerHeight();
            const overflowScrollTop = document.getElementById('chatBoxOverflow').scrollTop;
            const overflowScrollHeight = document.getElementById('chatBoxOverflow').scrollHeight;
            const overflowOuterHeight = document.getElementById('chatBoxOverflow').offsetHeight;

            return {
                contentScrollTop,
                contentScrollHeight,
                contentOuterHeight,
                overflowScrollTop,
                overflowScrollHeight,
                overflowOuterHeight,
            };
        },

        checkIfScrollIsMax: function () {
            const measures = App.getScrollTop();
            // /**/console.table(measures);
            const errorMargin = 30;
            const sum = parseInt(measures.contentScrollTop) + parseInt(measures.contentOuterHeight);
            const diff = measures.overflowOuterHeight - sum;
            return diff <= errorMargin;
        },

        moveScrollTop: function (checkScroll) {
            if (checkScroll) {
                // $chatBoxContent.scrollTop($chatBoxContent[0].scrollHeight);

                const scrollTop = document.getElementById('chatBoxContent').scrollTop;
                const scrollHeight = document.getElementById('chatBoxContent').scrollHeight

                // /**/console.log('scrollHeight', scrollHeight);
                // /**/console.log('scrollTop', scrollTop);

                document.getElementById('chatBoxContent').scrollTop = scrollHeight;
                // document.getElementById('chatBoxContent').scrollTo(0, 1000);
            }
        },

        addMessage: function (fake) {
            if (typeof fake == 'undefined') fake = false;

            let position = null;
            let message = null;
            let name = null;

            if (fake) {
                switch (rand(1, 3)) {
                    case 1: position = 'left'; break;
                    case 2: position = 'center'; break;
                    case 3: position = 'right'; break;
                }

                const words = [
                    'Nostrud',
                    'dolor',
                    'minim',
                    'eiusmod',
                    'do',
                    'consequat',
                    'laboris',
                    'occaecat',
                    'officia',
                    'laboris',
                ];

                let phrase = [];
                for (let i = 0; i < rand(1, 20); i++) {
                    phrase.push(words[rand(0, words.length)]);
                }

                message = phrase.join(' ');
                name = words[rand(0, words.length)];
            } else {
                position = 'right';
                message = nl2br(App.chat.form.message.trim());
                name = 'Você';

                App.chat.form.message = '';
            }

            if (position && message && name) {
                const checkScroll = App.checkIfScrollIsMax();

                let newMessage = {
                    position,
                    name,
                    message,
                };

                App.chat.messages.list.push(newMessage);

                setTimeout(function () {
                    App.moveScrollTop(checkScroll);
                }, 50);
            }
        },

        insertMessages: function (amount) {
            executeRecursive(function () {
                App.addMessage(true);
            }, amount);
        },

    },
});

App.insertMessages(5);
