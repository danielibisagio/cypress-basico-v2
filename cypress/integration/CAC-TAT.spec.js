/// <reference types="Cypress" />

//O bloco describe define a suíte de testes
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
      })
      
    //O bloco it, define um caso de teste.
    it('verifica o título da aplicação', function() {      
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Text passed to .type() may include any of the special character sequences below. These characters will pass along the correct keyCode, key, and which codes to any events issued during .type(). Some of the special character sequences may perform actions during typing such as {moveToEnd}, {moveToStart}, or {selectAll}.'

        cy.get('#firstName').type('Danieli')
        cy.get('#lastName').type('Bisagio')
        cy.get('#email').type('danieli@teste.com.br')
        cy.get('#open-text-area').type(longText,{delay:0})//roda muito mais rapido com o delay
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Danieli')
        cy.get('#lastName').type('Bisagio')
        cy.get('#email').type('danieli@teste,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('Campo do telefone fica vazio quando preenchido com campo não numerico', function(){
        cy.get('#phone').type('abcdefg').should['have.value', '']

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Danieli').clear().should['have.value', '']
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('youtube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()

    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        cy.get('input[type="file"]').selectFile('cypress/fixtures/ANEXO I - Leiaute e Regra de Validação - NF-e e NFC-e.pdf')
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    
    //removendo o targe a nova aba abre na mesma pagina
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')

    })



  })