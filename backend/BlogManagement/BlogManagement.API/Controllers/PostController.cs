using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Domain.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BlogManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet]
        public async Task<ActionResult<List<PostDTO>>> GetAll()
        {
            var result = await _postService.GetAllPostsAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _postService.GetPostByIdAsync(id);
            if (post == null)
                return NotFound();

            return Ok(post);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] PostDTO updatedPost)
        {
            if (id != updatedPost.Id)
                return BadRequest("Post ID mismatch");

            var result = await _postService.UpdatePostAsync(updatedPost);
            if (!result)
                return NotFound();

            return Ok(); 
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] PostDTO newPost)
        {
            var created = await _postService.CreatePostAsync(newPost);
            return CreatedAtAction(nameof(GetPost), new { id = created.Id }, created);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePost(int id)
        {
            var success = await _postService.DeletePostAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }



    }
}
