// 画布
var clearBtn = document.getElementById('mnist-pad-clear');
var saveBtn = document.getElementById('mnist-pad-save');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var mnistPad = new SignaturePad(canvas, {
    backgroundColor: 'transparent',
    minWidth: 3,
    maxWidth: 4,
});

clearBtn.addEventListener('click', function(event) {
    mnistPad.clear();
});

saveBtn.addEventListener('click', function(event) {
    if (mnistPad.isEmpty()) {
        alert('请书写一个数字');
    } else {
        img2text();
    }
});

// 识别数字 调后端接口
function img2text() {
    var result = document.querySelector('#mnist-pad-result'),
        connection = document.querySelector('#connection');
    connection.innerHTML = 'connecting...';

    var imageData = mnistPad.toDataURL('image/png');
    var dataTemp = imageData.substr(22);
    var formData = new FormData();

    formData.append('predictImg', dataTemp);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if ((request.status >= 200 && request.status < 300) || request.status == 304) {
                console.log(request.response);
                connection.innerHTML = '识别结果';
                if(request.response > 9) {
                    return alert('请输入0~9之间的数字！');
                }
                result.innerHTML = request.response;
            };
        }
    };

    request.open('POST', './predict');
    request.send(formData);
}
// 重置画布大小
function resizeCanvas() {
    var ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
//  canvas.getContext("2d").scale(ratio, ratio);
    mnistPad.clear();
};
window.onresize = resizeCanvas;
resizeCanvas();
