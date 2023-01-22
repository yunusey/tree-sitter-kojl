# tree-sitter-kojl
<img src="/imgs/1.png">
Treesitter for note-taking app Kojl.

# Configuration
The configuration for neovim:
```bash
git clone https://github.com/yunusey/tree-sitter-kojl
mkdir ~/.local/share/nvim/site/pack/packer/start/nvim-treesitter/queries/kojl/
cd tree-sitter-kojl/; cargo build;
cp tree-sitter-kojl/queries/* ~/.local/share/nvim/site/pack/packer/start/nvim-treesitter/queries/kojl/
```
```lua
-- init.lua
vim.filetype.add({
  extension = {
    kojl = 'kojl',
  }  
})

local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.kojl = {
  install_info = {
    url = "path/to/tree-sitter-kojl/",
    files = {"src/parser.c"},
    branch = "main",
    generate_requires_npm = false,
    requires_generate_from_grammar = true,
  },
  filetype = "kojl",
}

-- In your nvim-treesitter setup, you need to add "kojl" to ensure_installed list.
require('nvim-treesitter.configs').setup {
  ensure_installed = {..., "kojl" },
}
```
And update the nvim-treesitter:
```vim
:TSUpdate kojl
```

# Customization
For using the highlights, you can go to your theme plugin's theme file. You can find the names of the highlights in the ```queries/highlights.scm``` file. I did not read much about coloring them so far. I will try to add more details. But basically, you have some highlight names that can be found in the ```queries/highlights.scm``` with syntax ```@highlight_name```. These highlight_names, however, are not defined in your highlights. You need to add them to your theme. Or you can initialize them using your ```init.lua```:
```lua
vim.cmd(":highlight @kojl.boldtext term=bold guifg=#ff8888")
--        ^command ^highlight_name ^coloring_args
```

# Contribution
For now, I am still learning tree-sitter. I am sure there are a lot of thing we can change, and I have a lot of errors. By posting them as an issue, you can help me to improve the project.
