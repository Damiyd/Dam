const express = require("express");
const Posts = require("../schemas/post.js");
const router = express.Router();


// 게시글 작성 POST ( ex) localhost:3000/api/posts )
router.post("/posts", async (req, res) => {                 // async(비동기) 붙여야 await 할 수 있음/ 
                                         
    const {postsId, name, password, title, content} = req.body;
    const posts = await Posts.find({ postsId });

    if (posts.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
      }
      const createdPoods = await Posts.create({ postsId, name, password, title, content});

      res.json({ posts: createdPoods });
});

// 게시글 조회 GET ( ex) localhost:3000/api/posts )
router.get("/posts", async (req, res) => {
    
    const postsAll = await Posts.find().sort({date: -1});       // find() 싹다 가져옴
     const [...posts] = postsAll.map((post) => {
         return {
           _id : _id,
            postsId : post.postsId,
             title : post.title,
             name : post.name,
             content : post.content,
             data : post.data
         }   
     })

    res.json({
        posts,
    });
});
    // 1. 조회를 하려면 값을 받아와야겠죠?
    // -> 힌트 : 장바구니 목록 조회 API를 잘 하면 유심히 봐보세요

    // 2. 받아올때 날짜 기준으로 내림차순 정렬 하라고 요구사항에 있습니다
    // -> 힌트 : 어디서 "찾은 후(f 어쩌구)", "정렬을(s 어쩌구)" 한다 "내림찬순(검색해보기)"

    // 3. 받아왔으니 "배열"을 선언하고 그 찾은 값에 "길이"에 따라 불러오면 되겠죠?
    // -> 힌트 : 이전에 공부한 부분으로 가능(?)


// 게시글 상세 조회 GET ( ex) localhost:3000/api/posts/postid값 )
router.get("/posts/:postsId", async (req, res) => {

    const {postsId} = req.params;
    const postsAll = await Posts.find().sort({date: -1});       // find() 싹다 가져옴
    const [...posts] = postsAll.map((post) => {
        return {
          _id : _id,
           postsId : post.postsId,
            title : post.title,
            name : post.name,
            content: post.content,
            data : post.data
        }   
    })

    if (postsId.length === 0) {
        return res.staurs(400).json({success:false, errorMessage: "게시글이 없습니다."})
    }
    
    //const detail = posts.filter((item) => {return item.postsId === Number(postsId)})

    // 조회니깐 일반 조회랑 같죠? 여기서 이제 상세 조회니 조건을 추가하려고합니다.
    // 1. 상세를 조회를 했는데? 게시물이 없다? 오류 메세지 나오도록 설정
    // -> 힌트 : req.param으로 무엇을 받아서, 그걸 Posts에서 찾아보고, 조건문으로 오류 메세지 설정

    // 2. 오류가 안걸릴 경우
    // -> 다시 찾아서 "필터"를 통해 id 같은 값 찾아 그 안에 값을 나열하도록 배열에 넣기
    // -> res.json에 불러오기

    res.json({
        posts,
      });
});

// 게시글 수정 PUT ( ex) localhost:3000/api/posts/postid값 )
router.put("/posts/:postsId", async (req, res) => {
    const {postsId} = req.params;
    const {title,password,name} = req.body;
    const updateposts = await Posts.find({postsId: Number(postsId)});

    if (password === updateposts[0].password) {
        await Posts.updateOne({postsId: Number(postsId)}, {$set:{title,name}});
        return res.json({message: "수정이 완료되었습니다."})
    }
      
        res.json({ message: "일치하지 않습니다." });

    // 1. 수정을 하려면 먼저 수정할 부분을 가져와야겠죠?
    // -> 힌트 : req.params, req.body , 장바구니 구현(2)의 상품 수량 수정 API

    // 2. 받아와서 뼈대에 있는지 확인해야겠죠?
    // -> 힌트 : find, 장바구니 구현(2)의 상품 수량 수정 API

    // 3. 만약 없으면 오류가 나오도록 생성 + 비번도 안맞으면 오류 나오도록 생성 (요구사항 요구)
    // -> 힌트 : 이전에 배운걸로 가능

    // 4. 오류 없이 잘 받아오게되면 이제 수정을 해줍니다.
    // -> 힌트 updateOne 사용, 장바구니 구현(2)의 상품 수량 수정 API

});

// 게시글 삭제 DELETE ( ex) localhost:3000/api/posts/postid값 )
router.delete("/posts/:postsId", async (req, res) => {

    const {postsId} = req.params;
    const {password} = req.body;
    const removeposts = await Posts.find({postsId : Number(postsId)});
    if (password === removeposts[0].password) {
        await Posts.deleteOne({postsId: Number(postsId)});
        return res.json({message: "게시글을 삭제했습니다."})
    }


    // 1. 삭제을 하려면 먼저 삭제하기 위해 부분을 가져와야겠죠?
    // -> 힌트 : req.params, req.body , 장바구니 구현(2)의 상품 제거 API

    // 2. 가져왔으면 뼈대에 있는지 체크해야겠죠?
    // -> 힌트 : find, 장바구니 구현(2)의 상품 제거 API

    // 3. 만약 없으면 오류가 나오도록 생성 + 비번도 안맞으면 오류 나오도록 생성 (요구사항 요구)
    // -> 힌트 : 이전에 배운걸로 가능

    // 4. 오류 없이 잘 받아오게되면 이제 삭제을 해줍니다.
    // -> 힌트 delete 사용, 장바구니 구현(2)의 상품 제거 API

    res.json({message: "비밀번호 오류!!" });
});

module.exports = router;
