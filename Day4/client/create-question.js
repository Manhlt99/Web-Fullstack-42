const textArea = document.querySelector('.formQuestion');
const form = document.getElementById('form');

//Step 1: Bắt sự kiện
form.addEventListener("submit", (event) => {
    event.preventDefault();

    //Step 2: Lấy giá trị của text area (ô  chứa nội dung)
    const content = textArea.value;

    //Step 3: Gửi dữ liệu lên server
    $.ajax({
        url: 'http://localhost:8080/create-question',
        type: 'POST',
        data: {
            content: content,
        },
        success: (res) => {
            console.log(res);
        },
        error: (res) => {
            console.log(err);
        }
    })
})