const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }))

// Định Nghĩa các file trong thư mục "client" (sử dụng cho các file tĩnh)
app.use(express.static('client'))

app.get('/ask', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/create-question.html')
    res.sendFile(pathFile)
})

// app.get('/create-question.css', (req, res) => {
//     const pathFile = path.resolve(__dirname, './client/create-question.css')
//     res.sendFile(pathFile)
// })

app.post('/create-question', (req, res) => {
    const content = req.body.content;

    // input: nội dung câu hỏi
    // output: câu hỏi mới được lưu trong file data.json
    // Step 1: Đọc được danh sách câu hỏi cũ trong db
    fs.readFile('data.json', (err, data) => {
        if (err) return res.send({ success: 0 });

        let oldQuestions;

        try {
            oldQuestions = JSON.parse(data);
        } catch (err) {
            oldQuestions = []
        }

        // Step 2: Tạp câu hỏi
        const newQuestion = {
            id: oldQuestions.length,
            content: content,
            yesCount: 0,
            noCount: 0
        }

        // Step 3: Thêm câu hỏi mới vào cuối arr
        const newQuestions = [...oldQuestions, newQuestion];

        fs.writeFile('data.json', JSON.stringify(newQuestions), (err) => {
            if (err) return res.send({ success: 0 });

            res.send({ success: 1, data: newQuestion });
        })
    })
})

app.listen(8080, (err) => {
    if (err) throw err;

    console.log("Server Started");
})

