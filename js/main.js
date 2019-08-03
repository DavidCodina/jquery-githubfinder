$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;

    //Make request to Github
    $.ajax({
        url:'https://api.github.com/users/'+username,
        data:{
          client_id:'b9315bcd5a07fcd759d8',
          client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4'
        }
    })

    .done(function(user){
      $.ajax({
        url:             'https://api.github.com/users/' + username + '/repos',

        data: {
          client_id:     'b9315bcd5a07fcd759d8',
          client_secret: 'a2b698bf7e7c02f898197cf136d1a41f704ca8e4',
          sort:          'created: asc',
          per_page:      5
        }
      })

      .done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`

            <div class="card m-0 mb-5 p-0 border border-primary" style="min-height: 100px;">
              <div class="row m-0 p-0">
                <div class="col-md-4 m-0 p-2">
                  <strong class="d-block mb-3" style="color:violet">${repo.name}:</strong> ${repo.description}
                </div>

                <div class="col-md-5 m-0 py-2 px-0 text-center">
                  <span class="badge badge-primary p-2">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-primary p-2">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-primary p-2">Stars: ${repo.stargazers_count}</span>
                </div>

                <div class="col-md-3 m-0 p-2 text-center">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-success m-0">Repo Page</a>
                </div>
              </div>
            </div>

          `);
        });
      });

      $('#profile').html(`
        <div class="card border-primary my-5" style="max-width: 100rem;">
          <div class="card-header"><h3 style="color:violet;">${user.name}</h3></div>
          <div class="card-body">
            <div class="row">
            <div class="col-md-3">
              <img class="img-thumbnail avatar" src="${user.avatar_url}">
              <a target="_blank" class="btn btn-primary btn-block my-2" href="${user.html_url}">View Profile</a>
            </div>

            <div class="col-md-9 text-center">
              <span class="badge badge-primary p-2">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-primary p-2">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-primary p-2">Followers: ${user.followers}</span>
              <span class="badge badge-primary p-2">Following: ${user.following}</span>



              <ul class="list-group mt-3">
                <li class="list-group-item"><strong style="color:violet">Company:</strong> ${user.company}</li>
                <li class="list-group-item"><strong style="color:violet">Website/Blog:</strong> <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                <li class="list-group-item"><strong style="color:violet">Location:</strong> ${user.location}</li>
                <li class="list-group-item"><strong style="color:violet">Member Since:</strong> ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>


        <h3 class="mb-3 text-white">Latest Repos:</h3>


        <div id="repos" class="mb-5"></div>
        `);
    });
  });
});
