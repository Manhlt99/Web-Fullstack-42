const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const QuestionModel = require('./models/question');
const { connect } = require('http2');

// Kết nối mongoDB server
mongoose.connect("mongodb://localhost:27017/quyetde", (err) => {
    (err) => {
        if(err) throw err;
        console.log('Connect mongodb successfully');
    }
})

app.use(bodyParser.urlencoded({ extended: false }))

// Định Nghĩa các file trong thư mục "client" (sử dụng cho các file tĩnh)
app.use(express.static('client'))

app.get('/', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/Home.html')
    res.sendFile(pathFile)
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
}
app.get('/random-question', async(req, res) => {
    // lấy ngẫu nhiên câu hỏi

    // fs.readFile('data.json', (err, data) => {
    //     if (err) return res.send({ success: 0 })

    //     const questions = JSON.parse(data);

    //     const randomIndex = getRandomInt(0, questions.length)
    //     const foundQuestion = questions[randomIndex]

    //     if (!foundQuestion) {
    //         return res.send({ success: 0 })
    //     }

    //     return res.send({ success: 1, data: foundQuestion });
    // })

    // c1
    //     const questions = await QuestionModel.find();

    //     const randomIndex = getRandomInt(0, questions.length)
    //     const foundQuestion = questions[randomIndex]

    //     if (!foundQuestion) {
    //         return res.send({ success: 0 })
    //     }

    //     return res.send({ success: 1, data: foundQuestion });

    // c2

    const questions = await QuestionModel.aggregate([
        { $sample: {size: 1}}
    ]);
    if(questions.length){
        const foundQuestion = questions[0]
        return res.send({ success: 1, data: {
            ...foundQuestion,
            id: foundQuestion._id,
        }});
    }
    return res.send({success: 0});
})

app.get('/ask', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/create-question.html')
    res.sendFile(pathFile)
})

// app.post('/detail-question', (req, res) => {

// })

app.post('/create-question', async (req, res) => {
    // const content = req.body.content;

    // // input: nội dung câu hỏi
    // // output: câu hỏi mới được lưu trong file data.json
    // // Step 1: Đọc được danh sách câu hỏi cũ trong db
    // fs.readFile('data.json', (err, data) => {
    //     if (err) return res.send({ success: 0 });

    //     let oldQuestions;

    //     try {
    //         oldQuestions = JSON.parse(data);
    //     } catch (err) {
    //         oldQuestions = []
    //     }

    //     // Step 2: Tạo câu hỏi
    //     const newQuestion = {
    //         id: oldQuestions.length,
    //         content: content,
    //         yesCount: 0,
    //         noCount: 0
    //     }

        // Step 3: Thêm câu hỏi mới vào cuối arr
        // const newQuestions = [...oldQuestions, newQuestion];

        // fs.writeFile('data.json', JSON.stringify(newQuestions), (err) => {
        //     if (err) return res.send({ success: 0 });
        //     res.send({ success: 1, data: newQuestion });
        // })

        const { content } = req.body;

        const newQuestionData = {
            content,
        };

        const data = await QuestionModel.create(newQuestionData);
        console.log(data);
        res.send({success: 1, data: {
            ...data ,
            id: data._id
        }})
    // })
})

app.get('/question/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/detail-question.html'));
})

app.get('/detail-question/:id', async (req, res) => {
    const idQuestion = req.params.id;

    // fs.readFile('data.json', (err, data) => {
    //     if (err) return res.send({ success: 0 })

    //     const questions = JSON.parse(data);
    //     const foundQuestion = questions.find(q => q.id === parseInt(idQuestion));

    //     if (!foundQuestion) {
    //         return res.send({ success: 0 })
    //     }

    //     return res.send({ success: 1, data: foundQuestion });
    // })

    const foundQuestion = await QuestionModel.findById(idQuestion).lean();
    if (!foundQuestion) {
            return res.send({ success: 0 })
        }
    return res.send({ success: 1, data: {
        ...foundQuestion,
        id: foundQuestion._id,
    }});
})

app.get('/vote-question/:idQuestion/:voteType', async(req, res) => {
    const {idQuestion, voteType } = req.params;

    const question = await QuestionModel.findById(idQuestion);

    if(question){
        question[`${voteType}Count`]++;
        await question.save();
        return res.send({success: 1, data: question});
    }
    return res.send({success: 0});


    // fs.readFile('data.json', (err, data) => {
    //     if (err) return res.send({ success: 0 })

    //     const questions = JSON.parse(data);
    //     const foundQuestion = questions.find(q => q.id === parseInt(idQuestion));

    //     if (!foundQuestion) {
    //         return res.send({ success: 0 })
    //     }

    //     //Thay đổi vote
    //     // if(voteType === 'no'){
    //     //     foundQuestion.noCount++;
    //     // }else if(voteType === 'yes'){
    //     //     foundQuestion.yesCount++;
    //     // }

    //     foundQuestion[`${voteType}Count`]++

    //     foundQuestion.trueCount ++

    //     // lưu lại questions
    //     fs.writeFileSync('data.json', JSON.stringify(questions))
    //     return res.send({ success: 1, data: foundQuestion });
    // });
});

app.listen(8080, (err) => {
    if (err) throw err;

    console.log("Server Started");
})

