using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Blogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    id = 1,
                    userName = "admin",
                    password = "AQAAAAIAAYagAAAAECBDv45HjKh8fICAQiGHxYrLOG//1pNWP4o2hLW7823KluFc/NxDltWfAQDXP8ldlQ=="
                }
            );

            modelBuilder.Entity<Post>().HasData(
                new Post
                {
                    id = 1,
                    title = "Welcome Post",
                    content = "This is your first blog post!",
                    author = "admin",
                    createdAt = DateTime.UtcNow,
                    isPublished = true
                }
            );
        }

    }

}
