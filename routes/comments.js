const express = require("express");
const Posts = require("../schemas/post")
const Comments = require("../schemas/comment");
const router = express.Router();

// 댓글 생성 POST ( ex) localhost:3000/api/comments/받아오려는 id값 )
router.post("/comments/:postId", async (req, res) => {

    const {postId} = req.params;
    const {name, comment, password} = req.body;
    console.log(name,comment,postId)
    
    await Comments.create({
        commentsId: postId,
        name : name, 
        comment : comment,
        password : password
    
    });

    res.send("댓글생성완료!");
});

    // 1. 작성을 하려면 먼저 뼈대를 받아와야 합니다.
    // -> 힌트 : req.params, req.body, find 사용

    // 2. 뼈대를 받아왔으니 혹시 id값이 없을 수 있으니 오류 유도 (사실 안해도 되긴 함)
    // -> 힌트 : 이전에 배운걸로 가능

    // 3. 오류가 없으면 이제 생성
    // -> 힌트 : create 사용, 장바구니 구현(2)의 상품 추가 API 확인


// 댓글을 목록 보기 GET ( ex) localhost:3000/api/comments/받아오려는 id값 )
router.get("/comments/:postId", async (req, res) => {

    const {postId} = req.params;

    const [comments] = await Comments.find({postId: Number(postId)});

    console.log(comments,postId)

    // if (comments.length === 0) {
    //     return res.staurs(400).json({success:false, errorMessage: "댓글이 없습니다."})
    // }

    // const detail = comments.filter((item) => {return item.postId === Number(postId)})
    
    // 조회니깐 일반 조회랑 같죠? 여기서 이제 상세 조회니 조건을 추가하려고합니다.
    // 1. 상세를 조회를 했는데? 게시물이 없다? 오류 메세지 나오도록 설정
    // -> 힌트 : req.param으로 무엇을 받아서, 그걸 Posts에서 찾아보고, 조건문으로 오류 메세지 설정

    // 2. 오류가 안걸릴 경우
    // -> 다시 찾아서 "필터"를 통해 id 같은 값 찾아 그 안에 값을 나열하도록 배열에 넣기
    // -> res.json에 불러오기

    res.json({
        comments,
      });
});



// 댓글 수정 : /comments/:_commentId PUT
router.put("/comments/:commentId", async (req, res) => {

    const {commentId} = req.params;
    const {comment,password, name} = req.body;

    const updatecomments = await Comments.find({commentId: Number(commentId)});
    if (password === updatecomments[0].password) {
        await Comments.updateOne({commentId: Number(commentId)}, {$set:{comment,name}});
        return res.json({message: "수정이 완료되었습니다."})
    }
      
        res.json({ message: "일치하지 않습니다 !" });
      });

    // 1. 수정을 하려면 먼저 수정할 부분을 가져와야겠죠?
    // -> 힌트 : req.params, req.body , 장바구니 구현(2)의 상품 수량 수정 API

    // 2. 받아와서 뼈대에 있는지 확인해야겠죠?
    // -> 힌트 : find, 장바구니 구현(2)의 상품 수량 수정 API

    // 3. 만약 없으면 오류가 나오도록 생성 + 비번도 안맞으면 오류 나오도록 생성 (요구사항 요구)
    // -> 힌트 : 이전에 배운걸로 가능

    // 4. 오류 없이 잘 받아오게되면 이제 수정을 해줍니다.
    // -> 힌트 updateOne 사용, 장바구니 구현(2)의 상품 수량 수정 API




// 댓글 삭제 : /comments/:_commentId DELETE
router.delete("/comments/:commentId", async (req, res) => {
    const {commentId} = req.params
    const {password} = req.body;

    const removeComments = await Comments.find({commentId});
    if (password === removeComments[0].password) {
        await Comments.deleteOne({ commentId });
        return res.json({message: "게시글을 삭제했습니다."})
    }
    res.json({message: "비밀번호 오류!!" });

});

    // 1. 삭제을 하려면 먼저 삭제하기 위해 부분을 가져와야겠죠?
    // -> 힌트 : req.params, req.body , 장바구니 구현(2)의 상품 제거 API

    // 2. 가져왔으면 뼈대에 있는지 체크해야겠죠?
    // -> 힌트 : find, 장바구니 구현(2)의 상품 제거 API

    // 3. 만약 없으면 오류가 나오도록 생성 + 비번도 안맞으면 오류 나오도록 생성 (요구사항 요구)
    // -> 힌트 : 이전에 배운걸로 가능

    // 4. 오류 없이 잘 받아오게되면 이제 삭제을 해줍니다.
    // -> 힌트 delete 사용, 장바구니 구현(2)의 상품 제거 API

module.exports = router;