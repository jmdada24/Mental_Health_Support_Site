<?php
session_start();
// Check if user is logged in and is admin
if(!isset($_SESSION['unique_id']) || $_SESSION['role'] !== 'admin') {
    header("Location: ../html/login.php");
    exit();
}

?>
<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
  	<meta charset="utf-8">
  	<meta name="viewport" content="initial-scale=1, width=device-width">
  	
  	<link rel="stylesheet"  href="/css/community.css" />
  	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Potta One:wght@400&display=swap" />
  	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />
  	
  	
  	
</head>
<body>
  	
  	<div class="community-chat">
    		<div class="header">
      			<div class="frame-parent">
        				<div class="group-wrapper">
          					<div class="logo-serrenity-1-1-parent">
            						<img class="logo-serrenity-1-1-icon" alt="" src="Logo_serrenity_1 1.png">
            						
            						<div class="mindspace">MindSpace</div>
          					</div>
        				</div>
        				<div class="home-parent">
          					<b class="home">Home</b>
          					<b class="about-us">About Us</b>
          					<div class="self-help-parent">
            						<b class="about-us">Self-Help</b>
            						<img class="vector-icon" alt="" src="Vector.svg">
            						
          					</div>
        				</div>
        				<div class="rectangle-parent">
          					<div class="group-child">
          					</div>
          					<b class="account-name">Account Name</b>
        				</div>
      			</div>
    		</div>
    		<div class="main">
      			<div class="sidebar">
        				<div class="sidebar-inner">
          					<div class="frame-group">
            						<div class="frame-container">
              							<div class="communities-wrapper">
                								<b class="about-us">Communities</b>
              							</div>
              							<div class="create-a-community-parent">
                								<div class="about-us">Create a Community </div>
                								<img class="plus-icon" alt="" src="Plus.svg">
                								
              							</div>
              							<div class="join-a-community-wrapper">
                								<div class="join-a-community">Join a Community  </div>
              							</div>
            						</div>
            						<div class="frame-div">
              							<div class="resources-wrapper">
                								<b class="about-us">Resources</b>
              							</div>
              							<div class="about-community-mindspace-wrapper">
                								<div class="about-us">
                  									<p class="about-community">About Community</p>
                  									<p class="about-community">MindSpace</p>
                								</div>
              							</div>
              							<div class="about-community-mindspace-wrapper">
                								<div class="about-us">Policies</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
      			<div class="posts">
        				<div class="post2">
          					<div class="post-header">
            						<div class="post-info">
              							<img class="circle-user-solid-1-icon" alt="" src="circle-user-solid 1.svg">
              							
              							<b class="username">Username</b>
              							<div class="div">01/01/25</div>
            						</div>
            						<div class="ellipsis-solid-1">
              							<img class="vector-icon1" alt="" src="Vector.svg">
              							
            						</div>
          					</div>
          					<div class="post-content">
            						<div class="lorem-ipsum-dolor">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac nunc condimentum, rhoncus neque id, euismod tellus. Nunc nec nisl in tellus hendrerit elementum quis et leo.</div>
          					</div>
          					<div class="post-actions">
            						<img class="post-actions-child" alt="" src="Line 3.svg">
            						
            						<div class="actoins-group">
              							<div class="heart-action">
                								<img class="heart-regular-1-icon" alt="" src="heart-regular 1.svg">
                								
                								<div class="heart">heart</div>
              							</div>
              							<div class="comments-action">
                								<img class="heart-regular-1-icon" alt="" src="comment-regular 1.svg">
                								
                								<div class="comments">comments</div>
              							</div>
            						</div>
          					</div>
        				</div>
        				<div class="post1">
          					<div class="post-header">
            						<div class="post-info">
              							<img class="circle-user-solid-1-icon" alt="" src="circle-user-solid 1.svg">
              							
              							<b class="username">Username</b>
              							<div class="div">01/01/25</div>
            						</div>
            						<div class="ellipsis-solid-1">
              							<img class="vector-icon1" alt="" src="Vector.svg">
              							
            						</div>
          					</div>
          					<div class="post-content">
            						<div class="lorem-ipsum-dolor1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac nunc condimentum, rhoncus neque id, euismod tellus. Nunc nec nisl in tellus hendrerit elementum quis et leo.</div>
          					</div>
          					<div class="post-actions">
            						<img class="post-actions-child" alt="" src="Line 3.svg">
            						
            						<div class="actoins-group">
              							<div class="heart-action">
                								<img class="heart-regular-1-icon" alt="" src="heart-solid 1.svg">
                								
                								<div class="heart">heart</div>
              							</div>
              							<div class="comments-action">
                								<img class="heart-regular-1-icon" alt="" src="comment-regular 1.svg">
                								
                								<div class="comments">comments</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
      			<div class="wordoftheday">
        				<div class="wordoftheday-header">
          					<div class="word-of-the">Word of the Day</div>
          					<div class="div2">01/01/25</div>
          					<img class="wordoftheday-header-child" alt="" src="Line 3.svg">
          					
        				</div>
        				<b class="wordofday">Mindfulness</b>
        				<div class="definition">
          					<div class="definition1">DEFINITION:</div>
          					<div class="the-practice-of">-The practice of maintaining a nonjudgmental state of heightened awareness.</div>
        				</div>
      			</div>
      			<img class="main-child" alt="" src="Rectangle 22.svg">
      			
    		</div>
  	</div>
  	
  	
  	
  	
</body>
</html>

<html>
